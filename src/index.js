// src/index.js

import { logApplication }
from "./sheets/appendApplication.js";


const testJob = {

  platform: "Naukri",

  company: "Test Company",

  title: "MERN Stack Developer",

  roleType: "fullstack",

  resumePath:
    "resumes/fullstack.pdf",

  link:
    "https://example.com",
};


await logApplication(testJob);