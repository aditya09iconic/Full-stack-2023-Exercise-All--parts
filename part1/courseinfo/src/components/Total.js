const Total = (props) => {
    const exercises = props.exercises

    return (
        <p>Total of {exercises[0] + exercises[1] + exercises[2]+exercises[3]} exercises</p>
    )
}

export { Total }
