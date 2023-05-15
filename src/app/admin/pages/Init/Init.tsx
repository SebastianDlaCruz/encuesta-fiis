import { Box, Button, Stack, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AdminPath, getAdminRoutes } from "app/admin/admin-routes";
import { AdminStoreState } from "app/admin/store/store";
import Modal, { Type } from "app/shared/components/Modal/Modal";
import Table, { Operations } from "app/shared/components/Table/Table";
import { Colors } from "app/shared/utils/colors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Init.css';

const Init: React.FC = () => {
  const { encuestas } = useSelector((state: AdminStoreState) => state.admin);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', maxWidth: 100 },
    { field: 'title', headerName: 'Título', minWidth: 200 },
    { field: 'description', headerName: 'Descripción', width: 360 },
    {
      field: 'fecha',
      headerName: 'Fecha',
      type: 'date',
      maxWidth: 200
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      renderCell: ({ row }: GridRenderCellParams) => (<Operations encuesta={row} />),
      minWidth: 180
    },
    {
      field: 'view',
      headerName: 'Ver encuesta',
      renderCell: ({ row }: GridRenderCellParams) => (<Link className="linkEncuesta" to={getAdminRoutes(AdminPath.Encuesta) + `/${row.id}`}>Ver encuesta</Link>),
      minWidth: 180
    },
  ];

  useEffect(() => {

  }, [encuestas])

  return (
    <Stack spacing={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between" >
        <Typography variant="h5" component="h5">Modulo de Encuestas</Typography>
        <Button
          onClick={(): void => setIsOpenModal(true)}
          sx={{
            backgroundColor: Colors.Primary,
            color: "white",
            textTransform: "capitalize",
            ':hover': {
              backgroundColor: Colors.Secundary,
            }
          }}>Crear Encuesta</Button>
      </Box>
      <Table rows={encuestas} columns={columns} />
      <Modal open={isOpenModal} setOpen={setIsOpenModal} type={Type.Add} />
    </Stack>
  )
}

export default Init