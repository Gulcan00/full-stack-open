import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad, total, averageScore, positivePercentage}) => {
  return (
    <>
    <h2>statistics</h2>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={total} />
    <StatisticLine text="average" value={averageScore} />
    <StatisticLine text="positive" value={positivePercentage + ' %'} />
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const total = good + neutral + bad;
  const averageScore = (good - bad) / total;
  const positivePercentage = good * 100 / total;
  const noFeedbackGiven = good === 0 && neutral === 0 && bad === 0;

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      {
        noFeedbackGiven ? 
         (<p>No feedback given</p>) :
         <Statistics good={good} neutral={neutral} bad={bad} total={total} averageScore={averageScore} positivePercentage={positivePercentage} />
      }
    </div>
  )
}

export default App