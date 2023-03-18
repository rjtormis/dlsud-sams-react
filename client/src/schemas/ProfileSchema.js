import * as yup from "yup";
import { name_regex_profile } from "./Helper";

export const profileSchema = yup.object().shape({
  name: yup.string().matches(name_regex_profile, "Characters only.").required("Required *"),
  bio: yup.string().max(500, "Maximum of 500 characters only."),
  consultation: yup.string().max(50, "Maximum of 50 characters only."),
  socials: yup.object().shape({
    fb: yup.string().max(50, "Maximum of 50 characters only."),
    instagram: yup.string().max(50, "Maximum of 50 characters only."),
    twitter: yup.string().max(50, "Maximum of 50 characters only."),
  }),
});
