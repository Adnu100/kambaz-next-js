import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";

export default function LessonControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId?: string | undefined;
  deleteModule?: ((moduleId: string) => void) | undefined;
  editModule?: ((moduleId: string) => void) | undefined;
}) {
  return (
    <div className="float-end">
      {editModule && (
        <FaPencil
          onClick={() => editModule(moduleId ? moduleId : "")}
          className="text-primary me-3"
        />
      )}
      {deleteModule && (
        <FaTrash
          className="text-danger me-2 mb-1"
          onClick={() => deleteModule(moduleId ? moduleId : "")}
        />
      )}
      <GreenCheckmark />
      <BsPlus className="fs-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
