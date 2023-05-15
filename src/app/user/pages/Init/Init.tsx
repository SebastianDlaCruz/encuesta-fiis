import { Box, Button, Stack, Typography } from "@mui/material"
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import Table, { Operations } from "app/shared/components/Table/Table"
import Layout from "app/shared/components/Layout/Layout"
import { Colors } from "app/shared/utils/colors"
import Modal from "app/shared/components/Modal/Modal"
import dateFormat from "dateformat"
import { useState } from "react"
import { Encuesta } from "app/admin/store/types";

const Init: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const now = new Date();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Título', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 130 },
    {
      field: 'fecha',
      headerName: 'Fecha',
      type: 'date',
      width: 110
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 180,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.title || ''} ${params.row.description || ''}`,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      renderCell: ({row}: GridRenderCellParams) => (<Operations {...row} />),
      minWidth: 180
    },
  ];

  return (
    <Layout>
      <Stack spacing={4}>
        <Box display="flex" alignItems="center" justifyContent="space-between" >
          <Typography variant="h6" component="h6">Modulo de Encuestas</Typography>
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
      </Stack>
    </Layout>
  )
}

export default Init