const Course = ({course}) => {
const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total total={total} />
    </>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  return <strong>total of {props.total} exercises</strong>
}

export default Course;