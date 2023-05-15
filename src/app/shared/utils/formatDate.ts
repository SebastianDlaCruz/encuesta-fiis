import dateFormat from "dateformat"

const formatDate = (date:Date) => dateFormat(date,"dd/mm/yyyy");

export{
    formatDate
}