import React, {useEffect, useState} from "react";
import {CourseService} from "../service/CourseService";
import CourseTable from "../components/CourseTable";

export default function EnrolledCourses() {
    // 模拟setState - useState React Hook
    const [courses, setCourses] = useState([]);
    // 模拟componentDidMount
    useEffect(() => {
        CourseService.getStudentEnrolledCourses().then(response => {
            setCourses(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div>
            <CourseTable courses={courses}
                         buttonText={"Drop"}
                         buttonColor={"error"}
                         handleButtonClick={dropCourses}
            />
        </div>
    )

    function dropCourses(courseName) {
        CourseService.dropCourse(courseName)
            .then(response => {
                alert(`Congrats! ${courseName} dropped successfully!`);
                window.location.reload();
            }).catch(error => {
            alert(`Sorry, Drop ${courseName} failed due to ${error}`);
        });
    }
}