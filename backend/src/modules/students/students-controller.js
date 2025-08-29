const asyncHandler = require("express-async-handler");
const {
    getAllStudents,
    addNewStudent,
    getStudentDetail,
    setStudentStatus,
    updateStudent,
    deleteStudent
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;

    if (!studentData.first_name || !studentData.last_name || !studentData.email) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields (first_name, last_name, email)"
        });
    }

    const newStudent = await addNewStudent(studentData);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
});
const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedStudent = await updateStudent(id, updatedData);

    if (!updatedStudent) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: updatedStudent
    });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await getStudentDetail(id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            success: false,
            message: "Status is required"
        });
    }

    const updatedStudent = await setStudentStatus(id, status);

    if (!updatedStudent) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        message: `Student status updated to ${status}`,
        data: updatedStudent
    });
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleted = await deleteStudent(id);

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Student deleted successfully"
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent
};
