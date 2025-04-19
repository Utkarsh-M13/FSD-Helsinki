import Course from "./Course"

const App = () => {
  const courses =[
    {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    },
     {
      name: 'Some other state of a component',
      exercises: 14
    }
  ]
  },
  {
    name: 'Fullest Stack application development',
    parts: [
    {
      name: 'Fundamentals of Super React',
      exercises: 15
    },
    {
      name: 'Using many props to throw data',
      exercises: 17
    },
    {
      name: 'State of a super component',
      exercises: 14
    },
     {
      name: 'Many other state of a component',
      exercises: 14
    }
  ]
  }
  ] 

  return (
    courses.map((course) => <Course course={course} key={course.name}></Course>)
  )
}

export default App