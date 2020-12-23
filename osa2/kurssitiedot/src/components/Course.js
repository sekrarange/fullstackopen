import React from 'react'

const Header = (props) => {
  return (
    <>
      <h2>{props.course.name}</h2>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) =>
        <Part part={part} key={part.id} />
      )}
    </>
  )
}

const Total = (props) => {
  const total = props.course.parts.reduce((prev, curr) => {
    return prev + curr.exercises
  }, 0)
  return (
    <>
      <b>total of {total} exercises</b>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

export default Course