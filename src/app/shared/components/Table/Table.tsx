import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Colors } from 'app/shared/utils/colors';
import { Encuesta } from 'app/admin/store/types';
import { removeEncuesta } from 'app/admin/store/adminSlice';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import Modal, { Type } from 'app/shared/components/Modal/Modal';


interface OperationsInterface {
  encuesta: Encuesta;
}

export const Operations: React.FC<OperationsInterface> = ({ encuesta }) => {
  const dispatch = useDispatch();
  const [isOpenModal,setIsOpenModal] = useState<boolean>(false);

  const remove = () => {
    dispatch(removeEncuesta(encuesta.id));
  }

  const update = () =>{
    console.log('editar', encuesta.id)
    setIsOpenModal(true);
  }

  return (
    <Box display="flex" gap={2}>
      <Button onClick={update}>
        <EditIcon sx={{ color: Colors.Edit }} fontSize="medium" />
      </Button>
      <Button onClick={remove}>
        <DeleteIcon sx={{ color: Colors.Close }} fontSize="medium" />
      </Button>
      <Modal open={isOpenModal} setOpen={setIsOpenModal} type={Type.Edit} encuesta={encuesta}/>
    </Box>
  )
}

interface TableInterface {
  rows: any[];
  columns: any[]
}

const Table: React.FC<TableInterface> = ({ rows, columns }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default Table