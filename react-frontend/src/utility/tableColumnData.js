import { AccountCircleOutlined, ArrowDownwardOutlined, ArrowUpwardOutlined, CheckCircleOutlined, DeleteOutline } from '@material-ui/icons'
import { UPDATE_CUSTOMER } from '../requestMethods';
import { handleDelete, moveRow } from './tableUtility';

export const columns = (rowData, columnsToHide, handleAccept, refreshTable) => [
  { 
    cellClassName: 'idColumn',
    field: 'rowId', 
    headerName: 'ID', 
    width: 40,
    hide: columnsToHide.includes("ID")
  },

  {
    cellClassName: 'dateColumn',
    field: 'DateTime',
    renderHeader: (params) => {
      return (
        <h4>Geldiği Saat</h4>
      )
    },
    minWidth: 130,
    renderCell: (params) => {
      return (
        <div className='dateContainer'>
          <h4 className="dateText">{params.value.split(' ')[0]}</h4>
          <h4 className="dateText">{params.value.split(' ')[1]}</h4>
        </div>
      )
    },
    sortable: true,
    hide: columnsToHide.includes("Geldiği Saat")
  },

  /* NAME COLUMN */
  {
    cellClassName: 'nameColumn',
    field: 'Name',
    renderHeader: (params) => {
      return (
        <>
            <h4>{'İsim'}</h4>
            <AccountCircleOutlined style={{marginLeft: 5}}/>
        </>
      )
    },
    renderCell: (params) => {
      return (
        <h4>{params.value}</h4>
      )
    },
    sortable: false,
    flex: true,
    minWidth: 80,
    hide: columnsToHide.includes("İsim")
  },

  /* PHONE COLUMN */
  {
    cellClassName: 'phoneColumn',
    field: 'Phone',
    headerName: 'Telefon Numarası',
    flex: true,
    editable: true,
    hide: columnsToHide.includes("Telefon Numarası")
  },

  /* LOCATION COLUMN */
  {
    cellClassName: 'locationColumn',
    field: 'Location',
    headerName: 'Beklediği Yer',
    flex: true,
    editable: true,
    minWidth: 50,
    renderCell: (params) => {
      return (
        <h4>{params.value}</h4>
      )
    },
    hide: columnsToHide.includes("Beklediği Yer")
  },

  /* RESERVED TABLE COLUMN */
  {
    cellClassName: 'reservedTableColumn',
    field: 'ReservedTable',
    flex: true,
    editable: true,
    sortable: false,
    renderHeader: (params) => {
      return (
        <div className="reservedTable">
          <p>Masa Numarası</p>
        </div>
      )
    },
    renderCell: (params) => {
      return (
        <h4>{params.value}</h4>
      )
    },
    hide: columnsToHide.includes("Masa Numarası")
  },

  /* NOTES COLUMN */
  {
    cellClassName: 'notesColumn',
    field: 'Note',
    flex: true,
    sortable: false,
    renderHeader: (params) => {
      return (
        <div className="reservedTable">
          <p>Not</p>
        </div>
      )
    },
    renderCell: (params) => {
      return (
        <textarea style={{height:45, resize:'none', width:'100%'}} 
        rows="4" 
        placeholder="Not girebilirsiniz"
        defaultValue={params.value}
        onKeyDown={(e) => {
          if (e.key === 'Enter'){
            let element = params.row;
            element["Note"] = e.target.value;
            UPDATE_CUSTOMER(element, () => {refreshTable()});
          };
        }}
        />
      )
    },
    hide: columnsToHide.includes("Not")
  },

  /* EDIT COLUMN */
  {
    cellClassName: 'editColumn',
    field: 'edit',
    headerName: 'Düzenle',
    description: 'Hücre değerlerini düzenleme için kullanılır',
    sortable: false,
    editable: false,
    minWidth: 100,
    flex: true,
    renderCell: (params) => {
      return (
        <>
          <div className="iconContainer">
            <ArrowUpwardOutlined className='arrow up' onClick={() => 
              moveRow(params.row.rowId, "up", rowData, () => refreshTable())}/>
          </div>
          <div className="iconContainer">
            <ArrowDownwardOutlined className='arrow down' onClick={() => 
              moveRow(params.row.rowId, "down", rowData, () => refreshTable())}/>
          </div>
          <div className="iconContainer">
            <CheckCircleOutlined className="arrow up" onClick={() => handleAccept(params.row.id)}/>
          </div>
          <div className="iconContainer">
            <DeleteOutline className="deleteButton" onClick={() => 
               handleDelete(params.row.Id, () => refreshTable())}/>
          </div>
        </>
      )
    },
    hide: columnsToHide.includes("Düzenle")
  }
];