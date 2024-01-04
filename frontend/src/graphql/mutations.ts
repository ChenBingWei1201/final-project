import { graphql } from "../__generated__";

// Announcement
const CREATE_ANNOUNCEMENT_MUTATION = graphql(`
  mutation CreateAnnouncement($announcementInput: AnnouncementInput!) {
    CreateAnnouncement(announcementInput: $announcementInput) {
      id
      title
      date
      content
    }
  }
`);

const DELETE_ANNOUNCEMENT_MUTATION = graphql(`
  mutation DeleteAnnouncement($deleteAnnouncementId: Int!) {
    DeleteAnnouncement(id: $deleteAnnouncementId) {
      id
      title
      date
      content
    }
  }
`);

const UPDATE_ANNOUNCEMENT_MUTATION = graphql(`
  mutation UpdateAnnouncement(
    $updateAnnouncementId: Int!
    $announcementInput: AnnouncementInput!
  ) {
    UpdateAnnouncement(
      id: $updateAnnouncementId
      announcementInput: $announcementInput
    ) {
      id
      title
      date
      content
    }
  }
`);

// User
const CREATE_USER_MUTATION = graphql(`
  mutation CreateUser($userInput: UserInput!) {
    CreateUser(userInput: $userInput) {
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

const DELETE_USER_MUTATION = graphql(`
  mutation DeleteUser($deleteUserId: Int!) {
    DeleteUser(id: $deleteUserId) {
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

const UPDATE_USER_MUTATION = graphql(`
  mutation UpdateUser($updateUserId: Int!, $userInput: UserInput!) {
    UpdateUser(id: $updateUserId, userInput: $userInput) {
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

const UPDATE_USER_PASSWORD_MUTATION = graphql(`
  mutation UpdateUserPassword(
    $updateUserPasswordId: Int!
    $userPasswordInput: UserPasswordInput!
  ) {
    UpdateUserPassword(
      id: $updateUserPasswordId
      userPasswordInput: $userPasswordInput
    ) {
      id
      name
      studentID
      password
    }
  }
`);

const UPDATE_USER_PROFILE_MUTATION = graphql(`
  mutation UpdateUserProfile(
    $updateUserProfileId: Int!
    $userProfileInput: UserProfileInput!
  ) {
    UpdateUserProfile(
      id: $updateUserProfileId
      userProfileInput: $userProfileInput
    ) {
      id
      name
      introduction
      studentID
      photoLink
    }
  }
`);

// Article
const CREATE_ARTICLE_MUTATION = graphql(`
  mutation CreateArticle($articleInput: ArticleInput!) {
    CreateArticle(articleInput: $articleInput) {
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

const DELETE_ARTICLE_MUTATION = graphql(`
  mutation DeleteArticle($deleteArticleId: Int!) {
    DeleteArticle(id: $deleteArticleId) {
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

const UPDATE_ARTICLE_MUTATION = graphql(`
  mutation UpdateArticle($updateArticleId: Int!, $articleInput: ArticleInput!) {
    UpdateArticle(id: $updateArticleId, articleInput: $articleInput) {
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

const LIKE_ARTICLE_MUTATION = graphql(`
  mutation LikeArticle($articleLikeInput: ArticleLikeInput!) {
    LikeArticle(articleLikeInput: $articleLikeInput) {
      id
      likerId
      articleId
    }
  }
`);

const UNLIKE_ARTICLE_MUTATION = graphql(`
  mutation UnlikeArticle($articleUnlikeInput: ArticleLikeInput!) {
    UnlikeArticle(articleUnlikeInput: $articleUnlikeInput) {
      id
      likerId
      articleId
    }
  }
`);

// ArticleComment
const CREATE_ARTICLECOMMENT_MUTATION = graphql(`
  mutation CreateArticleComment($articleCommentInput: ArticleCommentInput!) {
    CreateArticleComment(articleCommentInput: $articleCommentInput) {
      id
      commenterId
      content
      date
      rootArticleId
      likesId
    }
  }
`);

const DELETE_ARTICLECOMMENT_MUTATION = graphql(`
  mutation DeleteArticleComment($deleteArticleCommentId: Int!) {
    DeleteArticleComment(id: $deleteArticleCommentId) {
      id
      commenterId
      content
      date
      rootArticleId
      likesId
    }
  }
`);

const UPDATE_ARTICLECOMMENT_MUTATION = graphql(`
  mutation UpdateArticleComment(
    $updateArticleCommentId: Int!
    $articleCommentInput: ArticleCommentInput!
  ) {
    UpdateArticleComment(
      id: $updateArticleCommentId
      articleCommentInput: $articleCommentInput
    ) {
      id
      commenterId
      content
      date
      rootArticleId
      likesId
    }
  }
`);

const LIKE_ARTICLECOMMENT_MUTATION = graphql(`
  mutation LikeArticleComment(
    $articleCommentLikeInput: ArticleCommentLikeInput!
  ) {
    LikeArticleComment(articleCommentLikeInput: $articleCommentLikeInput) {
      id
      likerId
      articleCommentId
    }
  }
`);

const UNLIKE_ARTICLECOMMENT_MUTATION = graphql(`
  mutation UnlikeArticleComment(
    $articleCommentUnlikeInput: ArticleCommentLikeInput!
  ) {
    UnlikeArticleComment(
      articleCommentUnlikeInput: $articleCommentUnlikeInput
    ) {
      id
      likerId
      articleCommentId
    }
  }
`);

// Question
const CREATE_QUESTION_MUTATION = graphql(`
  mutation CreateQuestion($questionInput: QuestionInput!) {
    CreateQuestion(questionInput: $questionInput) {
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

const DELETE_QUESTION_MUTATION = graphql(`
  mutation DeleteQuestion($deleteQuestionId: Int!) {
    DeleteQuestion(id: $deleteQuestionId) {
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

const UPDATE_QUESTION_MUTATION = graphql(`
  mutation UpdateQuestion(
    $updateQuestionId: Int!
    $questionInput: QuestionInput!
  ) {
    UpdateQuestion(id: $updateQuestionId, questionInput: $questionInput) {
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

const LIKE_QUESTION_MUTATION = graphql(`
  mutation LikeQuestion($questionLikeInput: QuestionLikeInput!) {
    LikeQuestion(questionLikeInput: $questionLikeInput) {
      id
      likerId
      questionId
    }
  }
`);

const UNLIKE_QUESTION_MUTATION = graphql(`
  mutation UnlikeQuestion($questionUnlikeInput: QuestionLikeInput!) {
    UnlikeQuestion(questionUnlikeInput: $questionUnlikeInput) {
      id
      likerId
      questionId
    }
  }
`);

// QuestionComment
const CREATE_QUESTIONCOMMENT_MUTATION = graphql(`
  mutation CreateQuestionComment($questionCommentInput: QuestionCommentInput!) {
    CreateQuestionComment(questionCommentInput: $questionCommentInput) {
      id
      commenterId
      rootQuestionId
      content
      date
    }
  }
`);

const DELETE_QUESTIONCOMMENT_MUTATION = graphql(`
  mutation DeleteQuestionComment($deleteQuestionCommentId: Int!) {
    DeleteQuestionComment(id: $deleteQuestionCommentId) {
      id
      commenterId
      rootQuestionId
      content
      date
    }
  }
`);

const UPDATE_QUESTIONCOMMENT_MUTATION = graphql(`
  mutation UpdateQuestionComment(
    $updateQuestionCommentId: Int!
    $questionCommentInput: QuestionCommentInput!
  ) {
    UpdateQuestionComment(
      id: $updateQuestionCommentId
      questionCommentInput: $questionCommentInput
    ) {
      id
      commenterId
      rootQuestionId
      content
      date
    }
  }
`);

const LIKE_QUESTIONCOMMENT_MUTATION = graphql(`
  mutation LikeQuestionComment(
    $questionCommentLikeInput: QuestionCommentLikeInput!
  ) {
    LikeQuestionComment(questionCommentLikeInput: $questionCommentLikeInput) {
      id
      likerId
      questionCommentId
    }
  }
`);

const UNLIKE_QUESTIONCOMMENT_MUTATION = graphql(`
  mutation UnlikeQuestionComment(
    $questionCommentUnlikeInput: QuestionCommentLikeInput!
  ) {
    UnlikeQuestionComment(
      questionCommentUnlikeInput: $questionCommentUnlikeInput
    ) {
      id
      likerId
      questionCommentId
    }
  }
`);

// Solution
const CREATE_SOLUTION_MUTATION = graphql(`
  mutation CreateSolution($solutionInput: SolutionInput!) {
    CreateSolution(solutionInput: $solutionInput) {
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

const DELETE_SOLUTION_MUTATION = graphql(`
  mutation DeleteSolution($deleteSolutionId: Int!) {
    DeleteSolution(id: $deleteSolutionId) {
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

const UPDATE_SOLUTION_MUTATION = graphql(`
  mutation UpdateSolution(
    $updateSolutionId: Int!
    $solutionInput: SolutionInput!
  ) {
    UpdateSolution(id: $updateSolutionId, solutionInput: $solutionInput) {
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

const LIKE_SOLUTION_MUTATION = graphql(`
  mutation LikeSolution($solutionLikeInput: SolutionLikeInput!) {
    LikeSolution(solutionLikeInput: $solutionLikeInput) {
      id
      likerId
      solutionId
    }
  }
`);

const UNLIKE_SOLUTION_MUTATION = graphql(`
  mutation UnlikeSolution($solutionUnlikeInput: SolutionLikeInput!) {
    UnlikeSolution(solutionUnlikeInput: $solutionUnlikeInput) {
      id
      likerId
      solutionId
    }
  }
`);

// SolutionComment
const CREATE_SOLUTIONCOMMENT_MUTATION = graphql(`
  mutation CreateSolutionComment($solutionCommentInput: SolutionCommentInput!) {
    CreateSolutionComment(solutionCommentInput: $solutionCommentInput) {
      id
      commenterId
      rootSolutionId
      content
      date
    }
  }
`);

const DELETE_SOLUTIONCOMMENT_MUTATION = graphql(`
  mutation DeleteSolutionComment($deleteSolutionCommentId: Int!) {
    DeleteSolutionComment(id: $deleteSolutionCommentId) {
      id
      commenterId
      rootSolutionId
      content
      date
    }
  }
`);

const UPDATE_SOLUTIONCOMMENT_MUTATION = graphql(`
  mutation UpdateSolutionComment(
    $updateSolutionCommentId: Int!
    $solutionCommentInput: SolutionCommentInput!
  ) {
    UpdateSolutionComment(
      id: $updateSolutionCommentId
      solutionCommentInput: $solutionCommentInput
    ) {
      id
      commenterId
      rootSolutionId
      content
      date
    }
  }
`);

const LIKE_SOLUTIONCOMMENT_MUTATION = graphql(`
  mutation LikeSolutionComment(
    $solutionCommentLikeInput: SolutionCommentLikeInput!
  ) {
    LikeSolutionComment(solutionCommentLikeInput: $solutionCommentLikeInput) {
      id
      likerId
      solutionCommentId
    }
  }
`);

const UNLIKE_SOLUTIONCOMMENT_MUTATION = graphql(`
  mutation UnlikeSolutionComment(
    $solutionCommentUnlikeInput: SolutionCommentLikeInput!
  ) {
    UnlikeSolutionComment(
      solutionCommentUnlikeInput: $solutionCommentUnlikeInput
    ) {
      id
      likerId
      solutionCommentId
    }
  }
`);

export {
  CREATE_ANNOUNCEMENT_MUTATION,
  DELETE_ANNOUNCEMENT_MUTATION,
  UPDATE_ANNOUNCEMENT_MUTATION,
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  UPDATE_USER_PASSWORD_MUTATION,
  UPDATE_USER_PROFILE_MUTATION,
  CREATE_ARTICLE_MUTATION,
  DELETE_ARTICLE_MUTATION,
  UPDATE_ARTICLE_MUTATION,
  LIKE_ARTICLE_MUTATION,
  UNLIKE_ARTICLE_MUTATION,
  CREATE_ARTICLECOMMENT_MUTATION,
  DELETE_ARTICLECOMMENT_MUTATION,
  UPDATE_ARTICLECOMMENT_MUTATION,
  LIKE_ARTICLECOMMENT_MUTATION,
  UNLIKE_ARTICLECOMMENT_MUTATION,
  CREATE_QUESTION_MUTATION,
  DELETE_QUESTION_MUTATION,
  UPDATE_QUESTION_MUTATION,
  LIKE_QUESTION_MUTATION,
  UNLIKE_QUESTION_MUTATION,
  CREATE_SOLUTION_MUTATION,
  DELETE_SOLUTION_MUTATION,
  UPDATE_SOLUTION_MUTATION,
  LIKE_SOLUTION_MUTATION,
  UNLIKE_SOLUTION_MUTATION,
  CREATE_QUESTIONCOMMENT_MUTATION,
  DELETE_QUESTIONCOMMENT_MUTATION,
  UPDATE_QUESTIONCOMMENT_MUTATION,
  LIKE_QUESTIONCOMMENT_MUTATION,
  UNLIKE_QUESTIONCOMMENT_MUTATION,
  CREATE_SOLUTIONCOMMENT_MUTATION,
  DELETE_SOLUTIONCOMMENT_MUTATION,
  UPDATE_SOLUTIONCOMMENT_MUTATION,
  LIKE_SOLUTIONCOMMENT_MUTATION,
  UNLIKE_SOLUTIONCOMMENT_MUTATION,
};
