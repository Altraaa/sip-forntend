import { useEffect, useState } from "react";
import Card from "@/ui/components/SharedCompoent/Card";
import MainLayout from "../../layouts/MainLayout";
import Button from "@/ui/components/SharedCompoent/Button";
import { SquarePlus } from "lucide-react";
import { useTasks } from "@/utils/hooks/useTask";
import { useUser } from "@/utils/hooks/useUser";
import Loading from "@/ui/components/SharedCompoent/Loading";
import { ITask } from "@/utils/models/Tasks";
import { Link } from "react-router-dom";

const ViewTask = () => {
  const { data: userData } = useUser();
  const { data: tasks, isLoading, isError } = useTasks();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (task: ITask) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedTask(null);
  };

  if (isError) {
    return <div>Error loading tasks</div>;
  }

  return (
    <MainLayout title="List Tasks">
      <Loading open={isLoading} />
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
            {tasks.map((task: ITask) => (
              <Card key={task.id} color="secondary" variant="outlined">
                <div className="flex flex-col justify-between gap-5 w-full h-full xl:p-2">
                  <div className="space-y-1">
                    <h1 className="font-semibold capitalize">{task.title}</h1>
                    <h2 className="text-sm">Due date: {task.due_date}</h2>
                    <h3 className="text-sm">Subject: {task.subject?.name}</h3>
                    <p className="text-gray-600 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {task.description}
                    </p>
                  </div>
                  <Button
                    label="View Detail"
                    color="secondary"
                    variant="contained"
                    className="text-sm w-full"
                    onClick={() => openPopup(task)}
                  />
                </div>
              </Card>
            ))}
          </div>
          {isPopupOpen && selectedTask && (
            <TaskPopup task={selectedTask} onClose={closePopup} />
          )}
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

const TaskPopup = ({ task, onClose }: { task: ITask; onClose: () => void }) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const dueDate = new Date(task.due_date);
      const diffMs = dueDate.getTime() - now.getTime();

      if (diffMs < 0) {
        const lateMs = Math.abs(diffMs);
        const lateMinutes = Math.floor(lateMs / (1000 * 60));
        const lateHours = Math.floor(lateMinutes / 60);
        const lateDays = Math.floor(lateHours / 24);
        const lateWeeks = Math.floor(lateDays / 7);
        const lateMonths = Math.floor(lateDays / 30);

        if (lateMinutes < 60) {
          setRemainingTime(`${lateMinutes} minutes late`);
        } else if (lateHours < 24) {
          setRemainingTime(`${lateHours} hours late`);
        } else if (lateDays < 7) {
          setRemainingTime(`${lateDays} days late`);
        } else if (lateWeeks < 4) {
          setRemainingTime(`${lateWeeks} weeks late`);
        } else {
          setRemainingTime(`${lateMonths} months late`);
        }
      } else {
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (hours < 24) {
          setRemainingTime(`${hours} hours left`);
        } else if (days < 7) {
          setRemainingTime(`${days} days ${hours % 24} hours left`);
        } else {
          setRemainingTime(`${weeks} weeks left`);
        }
      }
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 60000);
    return () => clearInterval(timer);
  }, [task.due_date]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white text-black py-6 px-10 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Task Detail</h2>
        <p className="font-semibold">Title: {task.title}</p>
        <p className="font-semibold">Subject: {task.subject?.name}</p>
        <p className="font-semibold">Due Date: {task.due_date}</p>
        <p className="font-semibold text-red-500">{remainingTime}</p>
        <p className="mt-2">{task.description}</p>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Mark as Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
