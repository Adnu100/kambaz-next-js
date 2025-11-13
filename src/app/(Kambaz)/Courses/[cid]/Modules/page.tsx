"use client";

import { useEffect } from "react";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useState } from "react";
import { editModule, setModules, updateModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const moduleObj = await client.createModuleForCourse(
      cid as string,
      newModule
    );
    dispatch(setModules([...modules, moduleObj]));
  };
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };
  const onUpdateModule = async (moduleObj: any) => {
    await client.updateModule(moduleObj);
    const newModules = modules.map((m: any) =>
      m._id === moduleObj._id ? moduleObj : m
    );
    dispatch(setModules(newModules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div>
      <div>
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={onCreateModuleForCourse}
        />
        <br />
        <br />
        <br />
        <br />
        <ListGroup className="rounded-0" id="wd-modules">
          {modules.map((moduleObj: any) => (
            <ListGroupItem
              className="wd-module p-0 mb-5 fs-5 border-gray"
              key={moduleObj._id}
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!moduleObj.editing && moduleObj.name}
                {moduleObj.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...moduleObj, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...moduleObj, editing: false });
                      }
                    }}
                    defaultValue={moduleObj.name}
                  />
                )}
                <LessonControlButtons
                  moduleId={moduleObj._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {moduleObj.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {moduleObj.lessons.map((lesson: any) => (
                    <ListGroupItem
                      className="wd-lesson p-3 ps-1"
                      key={lesson._id}
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
