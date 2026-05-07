// src/core/resumeMapper.js

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getResumePath(roleType) {
  switch (roleType) {
    case "frontend":
      return path.join(
        __dirname,
        "../../resumes/frontend/frontend-resume.pdf"
      );

    case "backend":
      return path.join(
        __dirname,
        "../../resumes/backend/backend-resume.pdf"
      );

    case "fullstack":
      return path.join(
        __dirname,
        "../../resumes/fullstack/fullstack-resume.pdf"
      );

    default:
      return null;
  }
}