import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CameraList(props) {
  const rows = props.cameras || []
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Camera Name</TableCell>
            <TableCell align="right">IP</TableCell>
            <TableCell align="right">Lat</TableCell>
            <TableCell align="right">Long</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            const rowEvent = () => props.setSelectedCameraIp(row.cameraIp)
            return (
            <TableRow
              key={row.name}
              selected={row.cameraIp === props.selectedCameraIp}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell onClick={rowEvent} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell onClick={rowEvent} align="right">{row.cameraIp}</TableCell>
              <TableCell onClick={rowEvent} align="right">{row.latitude}</TableCell>
              <TableCell onClick={rowEvent} align="right">{row.longitude}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CameraList;