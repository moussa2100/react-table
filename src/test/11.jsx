import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Tooltip } from "@mantine/core";
import { RiDeleteBin6Line, RiEditBoxLine, RiEyeLine } from "react-icons/ri";
import { InputAdornment, TextField } from "@mui/material";
import { RiSearchLine } from "react-icons/ri";

export function ProTableDemo2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataSource);
  }, []);

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  //sort fuction
  const sortFunc = (a, b) => {
    var nameA = a.toUpperCase(); // ignore upper and lowercase
    var nameB = b.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  };

  const statusCycle = (status) => {
    switch (status) {
      case "Training":
        return ["bg-blue-800"];
      case "Inactive":
        return ["bg-red-700"];
      case "Pending":
        return ["bg-yellow-600"];
      default:
        return ["bg-green-400"];
    }
  };

  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "AJohn Doe",
      employment: "Active",
      salary: 30000,
      position: "Software Engineer",
      age: "32",
      profileImage:
        "https://randompicturegenerator.com/img/people-generator/g807c681d5f257eb8c3961d9565e9692d444f7f8a056352c391d962acf3f4e5901e68cb72a188e355b90a4dd879a45178_640.jpg",
    },
    {
      key: "2",
      id: 2,
      name: "BJane Doe",
      employment: "Inactive",
      salary: 25000,
      position: "Senior Software Engineer",
      age: "32",
      profileImage:
        "https://randompicturegenerator.com/img/people-generator/gc1d29ce8fc0d5331f847c263c6ce1b8239a30e684ad92740c4b6d3eb2794e50355dfcf7011495fd0c1ac16390a9a9ed6_640.jpg",
    },
    {
      key: "3",
      id: 3,
      name: "CJohn Smith",
      employment: "Pending",
      salary: 30000,
      position: "Software Engineer",
      age: "32",
      profileImage:
        "https://randompicturegenerator.com/img/people-generator/gd121f56d8674f28d00ce9f1c44686e7a9bee58b8d33a3c57daaada1fa493c214290f9490833d1ff18f4ee16cd5298e1f_640.jpg",
    },
    {
      key: "4",
      id: 4,
      name: "DJane Smith",
      employment: "Training",
      salary: 25000,
      position: "Senior Software Engineer",
      age: "32",
      profileImage:
        "https://randompicturegenerator.com/img/people-generator/g5d8c66cb0f69f011ab5315c6e3b29c5250a2c59f03c9fb0136a638b1bb9b2d20172975768ce3425bde4d664b712ace74_640.jpg",
    },
    {
      key: "5",
      id: 5,
      name: "EJohn Doe",
      employment: "Active",
      salary: 30000,
      position: "Software Engineer",
      age: "32",
      profileImage:
        "https://randompicturegenerator.com/img/people-generator/g846294a31ce69fb5a7c35f45e3c4a917e1448ac59b4514d8def85c9d0c34e79e4a42edfb2d4c142e9ff4889235f7dc95_640.jpg",
    },
    {
      key: "6",
      id: 6,
      name: "EJohn Doe",
      employment: "Active",
      salary: 30000,
      position: "Software Engineer",
      age: "32",
      profileImage:
        "https://randompicturegenerator.com/img/people-generator/g846294a31ce69fb5a7c35f45e3c4a917e1448ac59b4514d8def85c9d0c34e79e4a42edfb2d4c142e9ff4889235f7dc95_640.jpg",
    },
  ];

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",

      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.profileImage}
            alt="profile"
            className="w-8 h-8 rounded-full mr-4"
          />
          <div>
            <p className="text-sm leading-5 font-medium text-gray-900">
              {text}
            </p>
            <p className="text-sm leading-5 text-gray-500">{record.position}</p>
          </div>
        </div>
      ),
      //   sorter: (a, b) => (a.name.length > b.name.length ? 1 : -1),
      sorter: (a, b) => sortFunc(a.name, b.name),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      filters: [
        {
          text: "",
          value: "",
        },
      ],
    },
    {
      title: "employment",
      dataIndex: "employment",

      render: (text, record) => (
        <div
          className={`px-2 py-1 text-sm rounded-md  text-white flex justify-center w-16 ${[
            ...statusCycle(record.employment),
          ]}`}
        >
          {text}
          {/* <span>
          <Highlight
            searchWords={[state.globalFilter]}
            textToHighlight={row.values.employment}
          />
        </span> */}
        </div>
      ),
      sorter: (a, b) => sortFunc(a.employment, b.employment),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.employment.startsWith(value),
      filters: [
        {
          text: "Training",
          value: "Training",
        },
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Inactive",
          value: "Inactive",
        },
        {
          text: "Pending",
          value: "Pending",
        },
      ],
    },
    {
      title: "salary",
      dataIndex: "salary",
      sorter: {
        compare: (a, b) => a.salary - b.salary,
        multiple: 1,
      },
    },
    {
      title: "position",
      dataIndex: "position",
      sorter: (a, b) => sortFunc(a.position, b.position),
    },
    {
      title: "age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",

      render: (text, record) => (
        <div className="flex items-center ">
          <Tooltip label="Delete" withArrow>
            <button
              className="py-1 px-2 text-xl rounded-md text-red-600"
              title="Delete "
            >
              <RiDeleteBin6Line />
            </button>
          </Tooltip>
          <Tooltip label="Edit" withArrow>
            <button
              className="py-1 px-2  text-xl rounded-md  text-teal-700"
              title="Edit "
              onClick={() => alert(record.name)}
            >
              <RiEditBoxLine />
            </button>
          </Tooltip>
          <Tooltip label="View" withArrow>
            <button
              className="py-1 px-2  text-xl rounded-md text-sky-600"
              title="View"
            >
              <RiEyeLine />
            </button>
          </Tooltip>
        </div>
      ),
    },
    // {
    //   title: "profileImage",
    //   dataIndex: "profileImage",
    //   key: "profileImage",
    //   hideInColumn: true,
    // },
  ];

  const [searchVal, setSearch] = useState("");

  //search array function
  function search(array, text) {
    text = text.toLowerCase();
    return array.filter(function (o) {
      return ["name", "salary", "position"].some(function (k) {
        return o[k].toString().toLowerCase().indexOf(text) !== -1;
      });
    });
  }

  const onSearchChange = (e) => {
    setSearch(e.target.value);

    const newDataSource = search(dataSource, e.target.value);
    setData(newDataSource);
    console.log(searchVal);
  };

  return (
    <div className="flex flex-col gap-6">
      <TextField
        className="w-[30%]"
        label="Search"
        value={searchVal}
        onChange={onSearchChange}
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <RiSearchLine />
            </InputAdornment>
          ),
        }}
      />

      <Table
        dataSource={data}
        columns={columns}
        rowSelection={true}
        pagination={true}
        onChange={onChange}
      />
    </div>
  );
}
export default ProTableDemo2;
