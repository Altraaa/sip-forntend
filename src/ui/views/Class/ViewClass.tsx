import { useStudents } from "@/utils/hooks/useStudent";
import MainLayout from "../../layouts/MainLayout";
import Loading from "@/ui/components/SharedCompoent/Loading";
import { IStudent } from "@/utils/models/Student";

const ViewClass = () => {
  const { data, isLoading, error } = useStudents(); // menggunakan hook useStudents

  if (isLoading) {
    return (
      <MainLayout title="Class">
        <h2>Loading...</h2>
        <Loading open={isLoading} />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Class">
        <h2>Error loading students.</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Class">
      <h2>Student List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Attendance
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>NIS</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Phone Number
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((student: IStudent) => (
              <tr key={student.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {student.attendance_number}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {student.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {student.nis}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {student.phone_number ? student.phone_number : "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {student.description ? student.description : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "8px" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default ViewClass;
