import { graphql } from "../__generated__";

// Announcement
const ALL_ANNOUNCEMENTS_QUERY = graphql(`
  query AllAnnouncements {
    AllAnnouncements {
      id
      title
      date
      content
    }
  }
`);

const HOMEPAGE_ANNOUNCEMENTS_QUERY = graphql(`
  query HomepageAnnouncements {
    HomepageAnnouncements {
      id
      title
      date
      content
    }
  }
`);

// User
const ALL_USERS_QUERY = graphql(`
  query AllUsers {
    AllUsers {
      id
      name
      studentID
      password
      photoLink
      introduction
      questionsId
      questionCommentsId
      solutionsId
      articlesId
      articleCommentsId
      likedQuestionsId
      likedQuestionCommentsId
      likedSolutionsId
      likedArticlesId
      likedArticleCommentsId
    }
  }
`);

// Article
const ALL_ARTICLES_QUERY = graphql(`
  query AllArticles {
    AllArticles {
      id
      writerId
      date
      title
      content
      tags
      topic
      commentsId
      likesId
    }
  }
`);

const HOMEPAGE_ARTICLES_QUERY = graphql(`
  query HomepageArticles {
    HomepageArticles {
      id
      writerId
      date
      title
      content
      tags
      topic
      commentsId
      likesId
    }
  }
`);

const SORT_ARTICLES_BY_TIME_QUERY = graphql(`
  query SortArticlesByTime {
    SortArticlesByTime {
      id
      writerId
      date
      title
      content
      tags
      topic
      commentsId
      likesId
    }
  }
`);

const SORT_ARTICLES_BY_LIKE_QUERY = graphql(`
  query SortArticlesByLike {
    SortArticlesByLike {
      id
      writerId
      date
      title
      content
      tags
      topic
      commentsId
      likesId
    }
  }
`);

const ALL_LIKED_ARTICLES_QUERY = graphql(`
  query AllLikedArticles($likerId: Int!) {
    AllLikedArticles(likerId: $likerId) {
      id
      writerId
      date
      title
      content
      tags
      topic
      commentsId
      likesId
    }
  }
`);

// ArticleComment
const ALL_ARTICLECOMMENTS_QUERY = graphql(`
  query AllArticleComments {
    AllArticleComments {
      id
      commenterId
      content
      date
      rootArticleId
      likesId
    }
  }
`);

const ALL_LIKED_ARTICLECOMMENTS_QUERY = graphql(`
  query AllLikedArticleComments($likerId: Int!) {
    AllLikedArticleComments(likerId: $likerId) {
      id
      commenterId
      content
      date
      rootArticleId
      likesId
    }
  }
`);

// Question
const ALL_QUESTIONS_QUERY = graphql(`
  query AllQuestions {
    AllQuestions {
      id
      askerId
      title
      date
      content
      topic
      tags
      commentsId
      solutionsId
      likesId
    }
  }
`);

const HOMEPAGE_QUESTIONS_QUERY = graphql(`
  query HomepageQuestions {
    HomepageQuestions {
      id
      askerId
      title
      date
      content
      topic
      tags
      commentsId
      solutionsId
      likesId
    }
  }
`);

const SORT_QUESTIONS_BY_TIME_QUERY = graphql(`
  query SortQuestionsByTime {
    SortQuestionsByTime {
      id
      askerId
      title
      date
      content
      topic
      tags
      commentsId
      solutionsId
      likesId
    }
  }
`);

const SORT_QUESTIONS_BY_LIKE_QUERY = graphql(`
  query SortQuestionsByLike {
    SortQuestionsByLike {
      id
      askerId
      title
      date
      content
      topic
      tags
      commentsId
      solutionsId
      likesId
    }
  }
`);

const ALL_LIKED_QUESTIONS_QUERY = graphql(`
  query AllLikedQuestions($likerId: Int!) {
    AllLikedQuestions(likerId: $likerId) {
      id
      askerId
      title
      date
      content
      topic
      tags
      commentsId
      solutionsId
      likesId
    }
  }
`);

// QuestionComment
const ALL_QUESTIONCOMMENTS_QUERY = graphql(`
  query AllQuestionComments {
    AllQuestionComments {
      id
      commenterId
      rootQuestionId
      content
      date
    }
  }
`);

const ALL_LIKED_QUESTIONCOMMENTS_QUERY = graphql(`
  query AllLikedQuestionComments($likerId: Int!) {
    AllLikedQuestionComments(likerId: $likerId) {
      id
      commenterId
      rootQuestionId
      content
      date
    }
  }
`);

// Solution
const ALL_SOLUTIONS_QUERY = graphql(`
  query AllSolutions {
    AllSolutions {
      id
      solverId
      rootQuestionId
      content
      date
      likesId
      commentsId
    }
  }
`);

const ALL_LIKED_SOLUTIONS_QUERY = graphql(`
  query AllLikedSolutions($likerId: Int!) {
    AllLikedSolutions(likerId: $likerId) {
      id
      solverId
      rootQuestionId
      content
      date
      likesId
      commentsId
    }
  }
`);

// SolutionComment
const ALL_SOLUTIONCOMMENTS_QUERY = graphql(`
  query AllSolutionComments {
    AllSolutionComments {
      id
      commenterId
      rootSolutionId
      content
      date
    }
  }
`);

const ALL_LIKED_SOLUTIONCOMMENTS_QUERY = graphql(`
  query AllLikedSolutionComments($likerId: Int!) {
    AllLikedSolutionComments(likerId: $likerId) {
      id
      commenterId
      rootSolutionId
      content
      date
    }
  }
`);

export {
  ALL_ANNOUNCEMENTS_QUERY,
  HOMEPAGE_ANNOUNCEMENTS_QUERY,
  ALL_USERS_QUERY,
  ALL_ARTICLES_QUERY,
  HOMEPAGE_ARTICLES_QUERY,
  SORT_ARTICLES_BY_TIME_QUERY,
  SORT_ARTICLES_BY_LIKE_QUERY,
  ALL_LIKED_ARTICLES_QUERY,
  ALL_ARTICLECOMMENTS_QUERY,
  ALL_LIKED_ARTICLECOMMENTS_QUERY,
  ALL_QUESTIONS_QUERY,
  HOMEPAGE_QUESTIONS_QUERY,
  SORT_QUESTIONS_BY_TIME_QUERY,
  SORT_QUESTIONS_BY_LIKE_QUERY,
  ALL_LIKED_QUESTIONS_QUERY,
  ALL_QUESTIONCOMMENTS_QUERY,
  ALL_LIKED_QUESTIONCOMMENTS_QUERY,
  ALL_SOLUTIONS_QUERY,
  ALL_LIKED_SOLUTIONS_QUERY,
  ALL_SOLUTIONCOMMENTS_QUERY,
  ALL_LIKED_SOLUTIONCOMMENTS_QUERY,
};
