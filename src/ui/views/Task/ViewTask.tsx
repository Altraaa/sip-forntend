import Card from "@/ui/components/SharedCompoent/Card";
import MainLayout from "../../layouts/MainLayout";
import Button from "@/ui/components/SharedCompoent/Button";
import { SquarePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTasks } from "@/utils/hooks/useTask";
import { useUser } from "@/utils/hooks/useUser";
import Loading from "@/ui/components/SharedCompoent/Loading";

const ViewTask = () => {
  const { data: userData } = useUser();
  const { data: tasks, isLoading, isError } = useTasks();

  if (isError) {
    return <div>Error loading tasks</div>;
  }

  return (
    <MainLayout title="List Tasks">
      <Loading open={isLoading} />
      {/* Cek apakah ada tugas yang cocok dengan studentId */}
      {tasks && tasks.length > 0 ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Hi,{" "}
              <span className="text-customColor-oranye">{userData?.name}</span>
            </h2>
            <p className="text-gray-600">
              Here's the assignment you didn't finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {tasks.map((task: any) => (
              <Card key={task.id} color="secondary" variant="outlined">
                <div className="flex flex-col w-full gap-5 xl:p-2">
                  <div className="space-y-1">
                    <h1 className="font-semibold">{task.title}</h1>
                    <h2 className="text-sm">Due date : </h2>
                    <p className="text-gray-600 text-xs">{task.description}</p>
                  </div>
                  <Button
                    label="View Detail"
                    color="secondary"
                    variant="contained"
                    className="text-sm"
                  />
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">
          <p>You haven't added any tasks.</p>
        </div>
      )}

      <div className="mt-6 w-full flex justify-end">
        <Link to="/addtask">
          <Button
            label="Add Task"
            color="secondary"
            variant="outlined"
            endIcon={<SquarePlus size={24} />}
            className="inline-flex items-center"
          />
        </Link>
      </div>
    </MainLayout>
  );
};

export default ViewTask;
