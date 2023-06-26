//import { h } from 'hyperapp'
import Pagination from '../components/Pagination.jsx'

export const Row = ({ row, rowColumns, actions }) => <tr>
    {rowColumns.map(z => <td>{z(row, actions)}</td>) }
</tr>

// export const RowF = ({ row, rowFilters, actions }) => <tr>
//     {rowColumns.map(z => <td>{z(row, actions)}</td>) }
// </tr>
//<tr>{rowFilters.map(z => <th>{z}</th>)}</tr>


const Table = ({ rowHeaders, rowFilters, rowColumns, rows, actions }) => <div>
    <table class="table table-striped table-hover">
        <thead><tr>
            {rowHeaders.map(z => <th>{z}</th>)}</tr>
        </thead>
        <tbody>
            
            {
                rows.items.map(z => <Row row={z} rowColumns={rowColumns} actions={actions
                }/>)
            }
        </tbody>
    </table>
    <Pagination page={rows.page} next={rows.next} previous={rows.previous} //loadAction={actions.load} 
    />
</div>

export default Table
