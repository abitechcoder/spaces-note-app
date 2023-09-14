import {
  createUserAccountService,
  createUserProfileService,
  getUserAccountByEmailService,
  getUserAccountByIdService,
  sendEmailService,
  updateUserProfileService,
} from "../user/userService.js";
import { validatePassword } from "../util/password.js";
import {
  generateRefreshTokenService,
  registerUserService,
  verifyRefreshUserAccessTokenService,
  verifyUserAccessTokenService,
  findAndUpdateUserRefreshTokenByEmailService,
} from "./authService.js";
import { APIErrors } from "./errorHandlers.js";

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(APIErrors.invalidRequest("All fields are required"));
    }
    //  checking if account already exit
    const userAccount = await getUserAccountByEmailService(email);
    if (!userAccount) {
      return next(
        APIErrors.notFound(`There is no account with the email ${email}`)
      );
    }
    //validate user password
    const hashedPassword = userAccount.password;
    if (!(await validatePassword(password, hashedPassword))) {
      return next(APIErrors.invalidRequest("Invalid Password"));
    }
    const accessToken = await registerUserService(email);
    // generating access token and storing it in the database
    const userRefreshToken = await generateRefreshTokenService(email);
    if (!accessToken) {
      return next(APIErrors.unAuthenticated());
    }
    const result = await findAndUpdateUserRefreshTokenByEmailService(
      email,
      userRefreshToken
    );
    res.cookie("access_token", accessToken, {
      httpOnly: true,
    });
    req.email = email;
    next();
    return res.status(200).json({
      success: "true",
      message: "Sign In Successful",
      userAccount,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuthController = async (req, res, next) => {
  const { user } = req;
  console.log(user);
  if (user) {
    const { email, picture, given_name, family_name } = user._json;
    const userAccount = await getUserAccountByEmailService(email);
    if (!userAccount) {
      // create account if it does not exist and signing user in at the same time
      const password = "none";
      const newUserAccount = await createUserAccountService(email, password);
	  console.log(newUserAccount);
      const userId = newUserAccount._id;
      const userProfile = await createUserProfileService(userId);
      //   const userProfile=await getUserProfileByUserIdService(userId)
      if (!userProfile) {
        return next(
          APIErrors.notFound(
            `there is no user profile associated with the account id ${userId}`
          )
        );
      }

      given_name
        ? (userProfile.firstName = given_name)
        : userProfile;
      family_name
        ? (userProfile.lastName = family_name)
        : userProfile;
      picture ? (userProfile.imageURL = picture) : userProfile;

      const updatedUserProfile = await updateUserProfileService(
        userId,
        userProfile
      );

      // sending email notification to user after successfully creating an account.
      await sendEmailService(email);

      //   console.log(newUserAccount);

      const accessToken = await registerUserService(email);
      // generating access token and storing it in the database
      const userRefreshToken = await generateRefreshTokenService(email);
      if (!accessToken) {
        return next(APIErrors.unAuthenticated());
      }
      const result = await findAndUpdateUserRefreshTokenByEmailService(
        newUserAccount.email,
        userRefreshToken
      );
      res.cookie("access_token", accessToken, {
        httpOnly: true,
      });
      req.email = email;
      next();
      return res.status(200).json({
        success: "true",
        message: "Sign In Successful",
        newUserAccount,
        accessToken,
      });
    }
    // signing in assisting user
    else {
      const accessToken = await registerUserService(email);
      // generating access token and storing it in the database
      const userRefreshToken = await generateRefreshTokenService(email);
      if (!accessToken) {
        return next(APIErrors.unAuthenticated());
      }
      const result = await findAndUpdateUserRefreshTokenByEmailService(
        email,
        userRefreshToken
      );
      res.cookie("access_token", accessToken, {
        httpOnly: true,
      });
      req.email = email;
      next();
      return res.status(200).json({
        success: "true",
        message: "Sign In Successful",
        userAccount,
        accessToken,
      });
    }
  }
  next();
};

export const verifyUserAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
      return next(APIErrors.unAuthenticated());
    }
    // verifying user access token
    const payload = await verifyUserAccessTokenService(accessToken);
    if (!payload) {
      return next(APIErrors.unAuthenticated("user access token has expired"));
    }
    req.email = payload.email;
    req.refreshToken = payload.refreshToken;
    next();
  } catch (error) {
    next(error);
  }
};

export const refreshUserAccessToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(APIErrors.unAuthenticated("you are not signed in"));
    }
    const userAccount = await getUserAccountByEmailService(email);
    if (!userAccount) {
      return next(
        APIErrors.notFound(
          `There is no account associated with the email: ${email}`
        )
      );
    }
    const refreshToken = userAccount.refreshToken;
    if (!refreshToken) {
      return next(APIErrors.notFound("Refresh token does not exit"));
    }
    const payload = await verifyRefreshUserAccessTokenService(refreshToken);
    if (!payload) {
      return next(APIErrors.unAuthenticated());
    }
    const accessToken = await registerUserService(payload.email);
    res.cookie("access_token", accessToken);
    // generation user refresh token
    const refreshAccessToken = await generateRefreshTokenService(payload.email);
    // updating user refresh token with new refresh token
    const result = await findAndUpdateUserRefreshTokenByEmailService(
      payload.email,
      refreshAccessToken
    );
    if (!result) {
      return next(APIErrors.unAuthenticated("no refresh token was found"));
    }
    res
      .status(200)
      .json({ success: "true", message: "access token refreshed" });
  } catch (error) {
    next(error);
  }
};
