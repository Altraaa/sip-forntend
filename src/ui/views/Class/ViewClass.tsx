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
      <h2 className="text-2xl font-semibold">Student List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                padding: "8px",
                backgroundColor: "#47acbe",
                borderRadius: "20px 0 0 0",
              }}
            >
              Attendance
            </th>
            <th style={{ padding: "8px", backgroundColor: "#47acbe" }}>Name</th>
            <th style={{ padding: "8px", backgroundColor: "#47acbe" }}>NIS</th>
            <th style={{ padding: "8px", backgroundColor: "#47acbe" }}>
              Phone Number
            </th>
            <th
              style={{
                padding: "8px",
                backgroundColor: "#47acbe",
                borderRadius: "0 20px 0 0",
              }}
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map(
              (
                student: IStudent,
                index: number // Add index here!
              ) => (
                <tr key={student.id}>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor:
                        student.id % 2 === 0 ? "#b5dde5" : "#c7e6eb",
                      borderRadius:
                        index === data.length - 1 ? "0 0 0 20px" : "0",
                    }}
                  >
                    {student.attendance_number}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      backgroundColor:
                        student.id % 2 === 0 ? "#b5dde5" : "#c7e6eb",
                    }}
                  >
                    {student.name}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor:
                        student.id % 2 === 0 ? "#b5dde5" : "#c7e6eb",
                    }}
                  >
                    {student.nis}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor:
                        student.id % 2 === 0 ? "#b5dde5" : "#c7e6eb",
                    }}
                  >
                    {student.phone_number ? student.phone_number : "-"}
                  </td>
                  {/* Last Column - Rounded Only in the Last Row */}
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor:
                        student.id % 2 === 0 ? "#b5dde5" : "#c7e6eb",
                      borderRadius:
                        index === data.length - 1 ? "0 0 20px" : "0", // Rounds bottom corners only on last row
                    }}
                  >
                    {student.description ? student.description : "-"}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "8px" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default ViewClass;
