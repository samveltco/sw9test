import { workOrderCustomFieldTypes } from "../../../utils/constants";

const CustomFieldRow = ({
  customField,
  removeField,
  editField,
}) => ( 
  <tr>
    <td data-th="Name">{customField.name}</td>
    <td data-th="Value">{customField.value}</td>
    <td data-th="Type">{workOrderCustomFieldTypes[customField.type]}</td>
    <td data-th="Action">
      <div className="row_block">
        <a href="#" className="icon_pencil" onClick={editField}>edit</a>
        <a href="#" className="icon_delete" onClick={removeField}>close</a>
      </div>
    </td>
  </tr>
)

export default CustomFieldRow;