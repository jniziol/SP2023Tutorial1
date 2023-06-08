import { userSignupForm } from "@/validators/user";
import { ValidationError } from "yup";
import { prisma } from "@/lib/prisma"; // this is coming from our custom library...check it out

export default async function handler(req, res) {
  const errorMessages = []; // this will hold our error messages, if we have any

  try {
    // validate the incoming inputs by running it through the validator
    // if there is an validation problem, the validator will throw an
    // ValidationError. abortEarly is required so that all the fields
    // get validated instead of only the first.
    const userObj = await userSignupForm.validate(req.body, { abortEarly: false });

    // Check if a user with that email already exists.
    // By this point all the rest of the validations have been executed.
    const user = await prisma.user.findUnique({
      where: {
        email: userObj.email,
      },
    });

    if (user !== null) {
      // if there is a user with this email address, append this error to our errors array
      errorMessages.push("The provided email address is already in use.");
    } else {
      await prisma.user.create({
        data: { name: userObj.name, email: userObj.email, password: userObj.password },
      });
    }

    await prisma.user.create({
      data: { name: userObj.name, email: userObj.email, password: userObj.password },
    });
  } catch (e) {
    // This will catch any ALL errors in the try block, but we are mostly interested
    // in a specific type of error called "ValidationError" thrown by the Yup validator
    if (e instanceof ValidationError) {
      // loop through all the errors and add them to the errors array,
      // I didn't talk about how I figured out where these errors are found in the 'e'
      // object above, but here's a hint - Yup documentation.
      for (const error of e.inner) {
        errorMessages.push(error.errors[0]);
      }
    } else {
      // if it's not a Yup validator error it's probably some other error,
      // let's log it to the console for easier debugging.
      console.log(e.messages);
    }
  }

  // If we have errors, return a 400 status with the error messages
  if (errorMessages.length > 0) {
    return res.status(400).json({ errorMessages });
  } else {
    // Otherwise everything went well!
    return res.status(201).send();
  }
}
