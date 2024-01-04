import React, { useState, useEffect } from 'react';
import { DataGrid, gridClasses, GridActionsCellItem } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import styles from "../../styles/Teacher/ITP-Prism.module.css";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import EditDrawer from "../../components/Teacher/ITPSumEditDrawer";


const ITPSummary = () => {
    localStorage.setItem('userRole', 'admin');
    const ODD_OPACITY = 0.2;
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditDrawerOpen, setEditDrawerOpen] = useState(false);
    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({

        [`& .${gridClasses.row}.even`]: {
            backgroundColor: theme.palette.grey[300],
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
            '&.Mui-selected': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY + theme.palette.action.selectedOpacity,
                ),
                '&:hover, &.Mui-hovered': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY +
                        theme.palette.action.selectedOpacity +
                        theme.palette.action.hoverOpacity,
                    ),
                    '@media (hover: none)': {
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            ODD_OPACITY + theme.palette.action.selectedOpacity,
                        ),
                    },
                },
            },
        },
    }));
    useEffect(() => {
        // Fetch data from the backend when the component mounts
        fetch('/getITPTable')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    const columns = [
        { field: 'id', headerName: 'Opportunity ID', width: 140 },
        { field: 'company', headerName: 'Company', width: 350 },
        { field: 'jobName', headerName: 'Job Name', width: 350 },
        { field: 'tic', headerName: 'Teacher-In-Charge', width: 200 },
        { field: 'student', headerName: 'Name', width: 150 },

    ];
    const actionColumns = [
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => [
                <GridActionsCellItem
                    className="DatagridIcons DatagridIcon_Edit"
                    icon={<EditIcon />}
                    onClick={() => displayEditForm(params.row)}
                    label="Edit"
                ></GridActionsCellItem>
            ],
        },
    ];

    const rows = [
        {
            id: 1,
            company: 'MAS',
            jobName: 'Tester',
            tic: 'Lim Khai Cher',
            student: 'Favian Mak'
        },
        {
            id: 2,
            company: 'SemCorp',
            jobName: 'Front End Developer',
            tic: 'Lim Khai Cher',
            student: 'fag'
        },

    ];
    const displayEditForm = (data) => {
        setEditData(data);
        setEditDrawerOpen(true);
    };

    const closeEditDrawer = () => {
        setEditDrawerOpen(false);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };
    const filteredRows = rows.filter((row) =>
        Object.values(row).some(
            (value) =>
                typeof value === 'string' && // Check if the value is a string
                value.toLowerCase().includes(searchText.toLowerCase())
        )
    );
    return (

        <div class="container">
            <div className={styles["maindiv"]}>
                <div className={styles["searchAdd"]}>
                    <div className={styles["search-div"]}>
                        <TextField
                            className={styles["search"]}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <div>
                      
                    </div>
                </div>
                <StripedDataGrid className={styles["table"]}
                    disableRowSelectionOnClick
                    rows={filteredRows}
                    columns={
                        columns.concat(actionColumns)}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },

                    }}
                    pageSizeOptions={[10, 15]}

                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }

                />
                {isEditDrawerOpen && (
                    <EditDrawer
                        data={editData}
                        onClose={closeEditDrawer}
                    />

                )}
            </div>

        </div>
    )
};
export default ITPSummary;