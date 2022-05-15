import React, { useState, useEffect } from "react";
import { Alert, Divider, Modal, useMantineTheme } from "@mantine/core";
import {
  Modal as AModal,
  Alert as AntAlert,
  Divider as AntDivider,
} from "antd";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { ImNotification } from "react-icons/im";
import { IoIosAddCircleOutline } from "react-icons/io";
import moment from "moment";

import { useStore } from "../../../../infra/store/index";

import DataTable from "../../UiComponents/dataTable";
import ProTableDemo2 from "../../../../test/11";

export default function Nationality() {
  const store = useStore();

  const columns = [
    { field: "id", headerName: "Code" },
    { field: "nat_name", headerName: "Nationality" },
  ];
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  //---------Ant Design Modal ---------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //-----------------End of Ant Design Modal---------------------------
  return (
    <>
      <div className="">
        <div className="flex items-center justify-center pb-5 ">
          <Alert
            icon={<ImNotification size={16} />}
            title="Bummer!"
            color="cyan"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </Alert>
        </div>

        <div className="flex justify-end ">
          <Button variant="outlined" onClick={() => setOpened(true)}>
            <IoIosAddCircleOutline size={16} className=" mr-1" /> Add New
          </Button>

          <Button variant="outlined" onClick={showModal}>
            <IoIosAddCircleOutline size={16} className=" mr-1" /> Ant Add
          </Button>
        </div>

        {/* ----------Ant Modal ---------------- */}
        <AModal
          title="Add New"
          width={"50%"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className=" text-gray-500">
            <AntAlert
              message="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
              type="success"
            />
          </div>
          <div className=" flex flex-col  ">
            {/* <hr /> */}
            <AntDivider style={{ fontSize: "12px" }} plain>
              Basic Info
            </AntDivider>

            <div className=" w-[32.5%] flex pb-2">
              <TextField label="Doctor Code" size="small" fullWidth />
            </div>
            <div className="flex  flex-wrap gap-2 ">
              <div className=" flex-auto ">
                <TextField label="First Name" size="small" fullWidth />
              </div>

              <div className=" flex-auto ">
                <TextField label="Middle Name" size="small" fullWidth />
              </div>
              <div className=" flex-auto  ">
                <TextField label="Last Name" size="small" fullWidth />
              </div>
            </div>
            <div className="flex  ">
              <div className=" flex-auto">
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  defaultValue={moment().format("YYYY-MM-DD")}
                  size="small"
                  fullWidth
                />
              </div>
              <div className=" flex-auto">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className=" flex-auto">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Nationality
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                  >
                    <MenuItem value={1}>Egypt</MenuItem>
                    <MenuItem value={2}>Saudi</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <hr />
            <div className="flex justify-end  ">
              <Button
                // size="small"
                variant="contained"
                className=" justify-self-end w-[100px]"
              >
                Save
              </Button>
            </div>
          </div>
        </AModal>
        {/* -----------End Ant Modal ---------------- */}

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Add New"
          size="50%"
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.7}
          //overlayBlur={5}
        >
          <div className="pb-2 text-gray-500">
            <p> Lorem ipsum dolor sit amet, consectetur </p>
          </div>
          <div className=" flex flex-col gap-4 ">
            <hr />
            <Divider label="Basic Info" labelPosition="center" />
            <div className=" w-[31%] flex">
              <TextField label="Doctor Code" size="small" fullWidth />
              <div></div>
            </div>
            <div className="flex gap-3 flex-wrap ">
              <div className=" ">
                <TextField label="First Name" size="small" fullWidth />
              </div>

              <div className=" ">
                <TextField label="Middle Name" size="small" fullWidth />
              </div>
              <div className="  ">
                <TextField label="Last Name" size="small" fullWidth />
              </div>
            </div>
            <div className="flex gap-3 ">
              <div className=" flex-1">
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  defaultValue={moment().format("YYYY-MM-DD")}
                  size="small"
                  fullWidth
                />
              </div>
              <div className=" flex-1">
                <Box>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                    >
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={2}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className=" flex-1">
                <Box>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Nationality
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                    >
                      <MenuItem value={1}>Egypt</MenuItem>
                      <MenuItem value={2}>Saudi</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>

            <hr />
            <div className="flex justify-end  ">
              <Button
                // size="small"
                variant="contained"
                className=" justify-self-end w-[100px]"
              >
                Save
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className=" ">
        {/* <DataTable /> */}
        <ProTableDemo2 />
      </div>
    </>
  );
}
