import { createCategoryService } from "../category/categoryService.js";
import {
  createUserAccountService,
  createUserProfileService,
  getUserAccountByEmailService,
  getUserProfileByUserIdService,
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
    await findAndUpdateUserRefreshTokenByEmailService(email, userRefreshToken);
    res
      .status(200)
      .cookie("access_token", `${accessToken}`, {
        httpOnly: true,
      })
      .json({
        success: "true",
        message: "Sign In Successful",
        userAccount: {
          _id: userAccount._id,
          email: userAccount.email
        },
        accessToken,
      });
    req.email = email;
    next();
  } catch (error) {
    next(error);
  }
};

export const googleAuthController = async (req, res, next) => {
  try {
    const { user } = req.body;
    if (!user) {
      return res.status(401).json({ success: false, message: "no user" });
    } else {
      const { email, picture, given_name, family_name } = user;
      const userAccount = await getUserAccountByEmailService(email);
      if (!userAccount) {
        // create account if it does not exist and signing user in at the same time
        const password = "";
        const newUserAccount = await createUserAccountService(email, password);
        const userId = newUserAccount._id;
        // creating user profile
        const userProfile = await createUserProfileService(userId);
        //   updating user profile
        given_name ? (userProfile.firstName = given_name) : userProfile;
        family_name ? (userProfile.lastName = family_name) : userProfile;
        picture ? (userProfile.imageURL = picture) : userProfile;
        await updateUserProfileService(userId, userProfile);
        const data = {
          title: "No category",
          userId,
        };
        // creating default category folder (No category folder)  for user
        await createCategoryService(data);
        // sending email notification to user after successfully creating an account.
        await sendEmailService(email);
        const accessToken = await registerUserService(email);
        // generating access token and storing it in the database
        const userRefreshToken = await generateRefreshTokenService(email);
        if (!accessToken) {
          return next(APIErrors.unAuthenticated());
        }
        // updating user refresh token
        await findAndUpdateUserRefreshTokenByEmailService(
          newUserAccount.email,
          userRefreshToken
        );
        // sending cookie to client device
        res.cookie("access_token", accessToken, {
          httpOnly: true,
        });
        req.email = email;
        next();
        return res.status(200).json({
          success: "true",
          message: "Sign In Successful",
          userAccount: {
            _id: newUserAccount._id,
            email: newUserAccount.email,
            refreshToken: newUserAccount.refreshToken,
            createdAt: newUserAccount.createdAt,
            updatedAt: newUserAccount.updatedAt,
          },
          accessToken,
        });
      }
      // signing in existing user
      else {
        const userId = userAccount._id;
        const accessToken = await registerUserService(email);
        // generating access token and storing it in the database
        const userRefreshToken = await generateRefreshTokenService(email);
        if (!accessToken) {
          return next(APIErrors.unAuthenticated());
        }
        // updating user refresh token
        await findAndUpdateUserRefreshTokenByEmailService(
          email,
          userRefreshToken
        );
        // updating user profile
        const userProfile = await getUserProfileByUserIdService(userId);
        given_name ? (userProfile.firstName = given_name) : userProfile;
        family_name ? (userProfile.lastName = family_name) : userProfile;
        picture ? (userProfile.imageURL = picture) : userProfile;

        await updateUserProfileService(userId, userProfile);

        res.cookie("access_token", accessToken, {
          httpOnly: true,
        });
        req.email = email;
        next();
        return res.status(200).json({
          success: "true",
          message: "Sign In Successful",
          userAccount: {
            _id: userAccount._id,
            email: userAccount.email,
            refreshToken: userAccount.refreshToken,
            createdAt: userAccount.createdAt,
            updatedAt: userAccount.updatedAt,
          },
          accessToken,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

// Verifying user access token
export const verifyUserAccessToken = async (req, res, next) => {
  try {
    // getting access token from client side
    const accessToken =req.cookies.access_token || req.headers["authorization"]?.split(" ")[1];
    if (!accessToken) {
      return next(APIErrors.unAuthenticated("you are not signed in"));
    }
    // verifying user access token
    const payload = await verifyUserAccessTokenService(accessToken);
    if (!payload) {
      return next(
        APIErrors.unAuthenticated(
          "user access token has expired. You must login"
        )
      );
    }
    req.email = payload.email;
    req.refreshToken = payload.refreshToken;
    next();
  } catch (error) {
    next(error);
  }
};
// Generating user refresh token controller
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
      return next(APIErrors.unAuthenticated("you are not signed in"));
    }
    // generation new access token for user
    const accessToken = await registerUserService(payload.email);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
    });
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
    res.status(200).json({
      success: "true",
      message: "access token refreshed",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// signing out controller

export const signOut = async (req, res, next) => {
  res.cookie("access_token", "", {
    httpOnly: true,
  });
  try {
    const { email } = req.body;
    const update = "";
    await findAndUpdateUserRefreshTokenByEmailService(email, update);
    return res
      .status(200)
      .json({ success: true, message: "user logged out successfully" });
  } catch (error) {
    next(error);
  }
};
