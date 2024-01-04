import { graphql } from "../__generated__";

// Announcement
const ANNOUNCEMENT_CREATED_SUBSCRIPTION = graphql(`
  subscription AnnouncementCreated {
    AnnouncementCreated {
      id
      date
      title
      content
    }
  }
`);

const ANNOUNCEMENT_DELETED_SUBSCRIPTION = graphql(`
  subscription AnnouncementDeleted {
    AnnouncementDeleted {
      id
      title
      date
      content
    }
  }
`);

const ANNOUNCEMENT_UPDATED_SUBSCRIPTION = graphql(`
  subscription AnnouncementUpdated {
    AnnouncementUpdated {
      id
      title
      date
      content
    }
  }
`);

// User
const USER_CREATED_SUBSCRIPTION = graphql(`
  subscription UserCreated {
    UserCreated {
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

const USER_DELETED_SUBSCRIPTION = graphql(`
  subscription UserDeleted {
    UserDeleted {
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

const USER_UPDATED_SUBSCRIPTION = graphql(`
  subscription UserUpdated {
    UserUpdated {
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
const ARTICLE_CREATED_SUBSCRIPTION = graphql(`
  subscription ArticleCreated {
    ArticleCreated {
      id
      writerId
      date
      title
      content
      topic
      tags
      likesId
    }
  }
`);

const ARTICLE_DELETED_SUBSCRIPTION = graphql(`
  subscription ArticleDeleted {
    ArticleDeleted {
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

const ARTICLE_UPDATED_SUBSCRIPTION = graphql(`
  subscription ArticleUpdated {
    ArticleUpdated {
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

const ARTICLE_LIKED_SUBSCRIPTION = graphql(`
  subscription ArticleLiked {
    ArticleLiked {
      id
      likerId
      articleId
    }
  }
`);

const ARTICLE_UNLIKED_SUBSCRIPTION = graphql(`
  subscription ArticleUnliked {
    ArticleUnliked {
      id
      likerId
      articleId
    }
  }
`);

// ArticleComment
const ARTICLECOMMENT_CREATED_SUBSCRIPTION = graphql(`
  subscription ArticleCommentCreated {
    ArticleCommentCreated {
      id
      commenterId
      content
      date
      rootArticleId
      likesId
    }
  }
`);

const ARTICLECOMMENT_DELETED_SUBSCRIPTION = graphql(`
  subscription ArticleDeleted {
    ArticleDeleted {
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

const ARTICLECOMMENT_UPDATED_SUBSCRIPTION = graphql(`
  subscription ArticleCommentDeleted {
    ArticleCommentUpdated {
      id
      commenterId
      content
      date
      rootArticleId
      likesId
    }
  }
`);

const ARTICLECOMMENT_LIKED_SUBSCRIPTION = graphql(`
  subscription ArticleCommentLiked {
    ArticleCommentLiked {
      id
      likerId
      articleCommentId
    }
  }
`);

const ARTICLECOMMENT_UNLIKED_SUBSCRIPTION = graphql(`
  subscription ArticleCommentUnliked {
    ArticleCommentUnliked {
      id
      likerId
      articleCommentId
    }
  }
`);

// Question
const QUESTION_CREATED_SUBSCRIPTION = graphql(`
  subscription QuestionCreated {
    QuestionCreated {
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

const QUESTION_DELETED_SUBSCRIPTION = graphql(`
  subscription QuestionDeleted {
    QuestionDeleted {
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

const QUESTION_UPDATED_SUBSCRIPTION = graphql(`
  subscription QuestionUpdated {
    QuestionUpdated {
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

const QUESTION_LIKED_SUBSCRIPTION = graphql(`
  subscription QuestionLiked {
    QuestionLiked {
      id
      likerId
      questionId
    }
  }
`);

const QUESTION_UNLIKED_SUBSCRIPTION = graphql(`
  subscription QuestionUnliked {
    QuestionUnliked {
      id
      likerId
      questionId
    }
  }
`);

// QuestionComment
const QUESTIONCOMMENT_CREATED_SUBSCRIPTION = graphql(`
  subscription QuestionCommentCreated {
    QuestionCommentCreated {
      id
      commenterId
      rootQuestionId
      content
      date
    }
  }
`);

const QUESTIONCOMMENT_DELETED_SUBSCRIPTION = graphql(`
  subscription QuestionCommentDeleted {
    QuestionCommentDeleted {
      id
      commenterId
      rootQuestionId
      content
      date
    }
  }
`);

const QUESTIONCOMMENT_UPDATED_SUBSCRIPTION = graphql(`
  subscription QuestionCommentUpdated {
    QuestionCommentUpdated {
      id
      commenterId
      rootQuestionId
      content
      date
    }
  }
`);

const QUESTIONCOMMENT_LIKED_SUBSCRIPTION = graphql(`
  subscription QuestionCommentLiked {
    QuestionCommentLiked {
      id
      likerId
      questionCommentId
    }
  }
`);

const QUESTIONCOMMENT_UNLIKED_SUBSCRIPTION = graphql(`
  subscription QuestionCommentUnliked {
    QuestionCommentUnliked {
      id
      likerId
      questionCommentId
    }
  }
`);

// Solution
const SOLUTION_CREATED_SUBSCRIPTION = graphql(`
  subscription SolutionCreated {
    SolutionCreated {
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

const SOLUTION_DELETED_SUBSCRIPTION = graphql(`
  subscription SolutionDeleted {
    SolutionDeleted {
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

const SOLUTION_UPDATED_SUBSCRIPTION = graphql(`
  subscription SolutionUpdated {
    SolutionUpdated {
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

const SOLUTION_LIKED_SUBSCRIPTION = graphql(`
  subscription SolutionLiked {
    SolutionLiked {
      id
      likerId
      solutionId
    }
  }
`);

const SOLUTION_UNLIKED_SUBSCRIPTION = graphql(`
  subscription SolutionUnliked {
    SolutionUnliked {
      id
      likerId
      solutionId
    }
  }
`);

// SolutionComment
const SOLUTIONCOMMENT_CREATED_SUBSCRIPTION = graphql(`
  subscription SolutionCommentCreated {
    SolutionCommentCreated {
      id
      commenterId
      rootSolutionId
      content
      date
    }
  }
`);

const SOLUTIONCOMMENT_DELETED_SUBSCRIPTION = graphql(`
  subscription SolutionCommentDeleted {
    SolutionCommentDeleted {
      id
      commenterId
      rootSolutionId
      content
      date
    }
  }
`);

const SOLUTIONCOMMENT_UPDATED_SUBSCRIPTION = graphql(`
  subscription SolutionUpdated {
    SolutionUpdated {
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

const SOLUTIONCOMMENT_LIKED_SUBSCRIPTION = graphql(`
  subscription SolutionLiked {
    SolutionLiked {
      id
      likerId
      solutionId
    }
  }
`);

const SOLUTIONCOMMENT_UNLIKED_SUBSCRIPTION = graphql(`
  subscription SolutionUnliked {
    SolutionUnliked {
      id
      likerId
      solutionId
    }
  }
`);

export {
  ANNOUNCEMENT_CREATED_SUBSCRIPTION,
  ANNOUNCEMENT_DELETED_SUBSCRIPTION,
  ANNOUNCEMENT_UPDATED_SUBSCRIPTION,
  USER_CREATED_SUBSCRIPTION,
  USER_DELETED_SUBSCRIPTION,
  USER_UPDATED_SUBSCRIPTION,
  ARTICLE_CREATED_SUBSCRIPTION,
  ARTICLE_DELETED_SUBSCRIPTION,
  ARTICLE_UPDATED_SUBSCRIPTION,
  ARTICLE_LIKED_SUBSCRIPTION,
  ARTICLE_UNLIKED_SUBSCRIPTION,
  ARTICLECOMMENT_CREATED_SUBSCRIPTION,
  ARTICLECOMMENT_DELETED_SUBSCRIPTION,
  ARTICLECOMMENT_UPDATED_SUBSCRIPTION,
  ARTICLECOMMENT_LIKED_SUBSCRIPTION,
  ARTICLECOMMENT_UNLIKED_SUBSCRIPTION,
  QUESTION_CREATED_SUBSCRIPTION,
  QUESTION_DELETED_SUBSCRIPTION,
  QUESTION_UPDATED_SUBSCRIPTION,
  QUESTION_LIKED_SUBSCRIPTION,
  QUESTION_UNLIKED_SUBSCRIPTION,
  QUESTIONCOMMENT_CREATED_SUBSCRIPTION,
  QUESTIONCOMMENT_DELETED_SUBSCRIPTION,
  QUESTIONCOMMENT_UPDATED_SUBSCRIPTION,
  QUESTIONCOMMENT_LIKED_SUBSCRIPTION,
  QUESTIONCOMMENT_UNLIKED_SUBSCRIPTION,
  SOLUTION_CREATED_SUBSCRIPTION,
  SOLUTION_DELETED_SUBSCRIPTION,
  SOLUTION_UPDATED_SUBSCRIPTION,
  SOLUTION_LIKED_SUBSCRIPTION,
  SOLUTION_UNLIKED_SUBSCRIPTION,
  SOLUTIONCOMMENT_CREATED_SUBSCRIPTION,
  SOLUTIONCOMMENT_DELETED_SUBSCRIPTION,
  SOLUTIONCOMMENT_UPDATED_SUBSCRIPTION,
  SOLUTIONCOMMENT_LIKED_SUBSCRIPTION,
  SOLUTIONCOMMENT_UNLIKED_SUBSCRIPTION,
};
