import React, { useState, useEffect } from 'react'

import { publicFetch } from '../util/fetcher'

import Layout from '../components/layout'
import QuestionWrapper from '../components/question/question-wrapper'
import QuestionStats from '../components/question/question-stats'
import QuestionSummary from '../components/question/question-summary'
import PageTitle from '../components/page-title'
import { Spinner } from '../components/icons'

const HomePage = () => {
  const [questions, setQuestions] = useState(null)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await publicFetch.get('/question')
        setQuestions(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchQuestion()
  }, [])

  return (
    <Layout>
      <PageTitle title="All Questions" button />

      {!questions && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {questions?.map(
        ({ id, votes, answers, views, title, text, tags, author, created }) => (
          <QuestionWrapper key={id}>
            <QuestionStats
              voteCount={votes.length}
              answerCount={answers.length}
              view={views}
            />
            <QuestionSummary
              id={id}
              title={title}
              tags={tags}
              author={author}
              createdTime={created}
            >
              {text}
            </QuestionSummary>
          </QuestionWrapper>
        )
      )}
    </Layout>
  )
}

export default HomePage
