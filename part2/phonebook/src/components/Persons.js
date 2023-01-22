import { Person } from './Person'

const Persons = (props) => {
  const { persons, searchName, setPersons } = props

  return (
    <div>
      <table>
        <tbody>
          {
            persons.map((element) => {
              if (searchName.length === 0 || element.name.search(props.searchName) !== -1) {
                return (
                  <Person key={element.id} person={element} setPersons={props.setPersons} />
                )
              } else {
                return null
              }
            }
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export { Persons }