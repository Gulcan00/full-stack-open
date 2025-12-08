const Course = ({course, total}) => {
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

const Total = (props) => <strong>total of {props.total} exercises</strong>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return <Course course={course} total={total}/>
}

export default App