const loginService = require("../services/loginService");
const studentService = require("../services/student");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await loginService.loginUser(email, password);

    const student = await studentService.getByEmail(user.Email);

    if ('StudentID' in student) {
      res.status(200).json({ userRole: 'regular', studentID: student.StudentID });
      return;
    } 

    res.status(200).json({ userRole: 'admin' });
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).send(err.message);
  }
}

module.exports = {
  loginUser,
};
