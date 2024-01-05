import { prisma } from "../../prisma/client.ts";
import { pubsub } from "../PubSub/pubsub.ts";
import {
  AnnouncementInput,
  ArticleCommentInput,
  ArticleInput,
  UserInput,
  UserPasswordInput,
  ArticleLikeInput,
  ArticleCommentLikeInput,
  QuestionInput,
  QuestionCommentInput,
  QuestionLikeInput,
  QuestionCommentLikeInput,
  SolutionInput,
  SolutionCommentInput,
  SolutionLikeInput,
  SolutionCommentLikeInput,
  UserProfileInput,
} from "../types/types.ts";

const Mutation = {
  // Announcement Start
  CreateAnnouncement: async (
    _parent,
    args: { announcementInput: AnnouncementInput },
    _context,
  ) => {
    const { title, content } = args.announcementInput;
    const date = new Date().toUTCString();
    const newAnnouncement = await prisma.announcement.create({
      data: {
        title: title,
        content: content,
        date: date,
      },
    });
    await pubsub.publish("ANNOUNCEMENT_CREATED", {
      AnnouncementCreated: newAnnouncement,
    });
    return newAnnouncement;
  },

  DeleteAnnouncement: async (_parent, args: { id: number }, _context) => {
    const id = args.id;
    const existingAnnouncement = await prisma.announcement.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingAnnouncement) {
      throw new Error("announcement not found!");
    }

    const deletedAnnouncement = await prisma.announcement.delete({
      where: {
        id: id,
      },
    });
    await pubsub.publish("ANNOUNCEMENT_DELETED", {
      AnnouncementDeleted: deletedAnnouncement,
    });
    return deletedAnnouncement;
  },

  UpdateAnnouncement: async (
    _parent,
    args: { id: number; announcementInput: AnnouncementInput },
    _context,
  ) => {
    const id = args.id;
    const { title, content } = args.announcementInput;
    const existingAnnouncement = await prisma.announcement.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingAnnouncement) {
      throw new Error("announcement not found!");
    }

    const updatedAnnouncement = await prisma.announcement.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
      },
    });
    await pubsub.publish("ANNOUNCEMENT_UPDATED", {
      AnnouncementUpdated: updatedAnnouncement,
    });
    return updatedAnnouncement;
  },
  // Announcement End

  // User Start
  CreateUser: async (_parent, args: { userInput: UserInput }, _context) => {
    const { name, studentID, password, photoLink, introduction } =
      args.userInput;
    const newUser = await prisma.user.create({
      data: {
        name: name,
        studentID: studentID,
        password: password,
        photoLink: photoLink,
        introduction: introduction,
      },
    });
    await pubsub.publish("USER_CREATED", { UserCreated: newUser });
    return newUser;
  },

  DeleteUser: async (_parent, args: { id: number }, _context) => {
    const id = args.id;
    const existingUser = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingUser) {
      throw new Error("user not found!");
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    await pubsub.publish("USER_DELETED", { UserDeleted: deletedUser });
    return deletedUser;
  },

  UpdateUser: async (
    _parent,
    args: { id: number; userInput: UserInput },
    _context,
  ) => {
    const id = args.id;
    const { name, studentID, password, photoLink, introduction } =
      args.userInput;
    const existingUser = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingUser) {
      throw new Error("user not found!");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        studentID: studentID,
        password: password,
        photoLink: photoLink,
        introduction: introduction,
      },
    });
    await pubsub.publish("USER_UPDATED", { UserUpdated: updatedUser });
    return updatedUser;
  },

  UpdateUserPassword: async (
    _parent,
    args: { id: number; userPasswordInput: UserPasswordInput },
    _context,
  ) => {
    const id = args.id;
    const { password } = args.userPasswordInput;
    const existingUser = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingUser) {
      throw new Error("user not found!");
    }

    const updatedUserPassword = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });

    await pubsub.publish("USER_UPDATED", { UserUpdated: updatedUserPassword });
    return updatedUserPassword;
  },

  UpdateUserProfile: async (
    _parent,
    args: { id: number; userProfileInput: UserProfileInput },
    _context,
  ) => {
    const id = args.id;
    const { name, introduction, studentID, photoLink } = args.userProfileInput;
    const existingUser = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingUser) {
      throw new Error("user not found!");
    }

    const updatedUserProfile = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        introduction: introduction,
        studentID: studentID,
        photoLink: photoLink,
      },
    });

    await pubsub.publish("USER_UPDATED", { UserUpdated: updatedUserProfile });
    return updatedUserProfile;
  },
  // User End

  // Question Start
  CreateQuestion: async (
    _parent,
    args: { questionInput: QuestionInput },
    _context,
  ) => {
    const { askerId, title, content, topic, tags } = args.questionInput;
    const newQuestion = await prisma.question.create({
      data: {
        askerId: askerId,
        title: title,
        date: new Date().toUTCString(),
        content: content,
        topic: topic,
        tags: tags,
      },
    });
    await prisma.user.update({
      where: {
        id: askerId,
      },
      data: {
        questionsId: { push: newQuestion.id },
      },
    });
    await pubsub.publish("QUESTION_CREATED", { QuestionCreated: newQuestion });
    return newQuestion;
  },

  DeleteQuestion: async (_parent, args: { id: number }, _context) => {
    const id = args.id;
    const existingQuestion = await prisma.question.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingQuestion) {
      throw new Error("question not found!");
    }
    const deletedQuestion = await prisma.question.delete({
      where: {
        id: id,
      },
    });
    const updateUser = await prisma.user.findFirst({
      where: {
        id: deletedQuestion.askerId,
      },
    });
    await prisma.user.update({
      where: {
        id: updateUser.id,
      },
      data: {
        questionsId: updateUser.questionsId.filter(
          (id) => id !== deletedQuestion.id,
        ),
      },
    });
    await pubsub.publish("QUESTION_DELETED", {
      QuestionDeleted: deletedQuestion,
    });
    return deletedQuestion;
  },

  UpdateQuestion: async (
    _parent,
    args: { id: number; questionInput: QuestionInput },
    _context,
  ) => {
    const id = args.id;
    const { askerId, title, content, topic, tags } = args.questionInput;
    const existingQuestion = await prisma.question.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingQuestion) {
      throw new Error("question not found!");
    }
    if (existingQuestion.askerId !== askerId) {
      throw new Error("Asker changed, this is not supposed to happen...");
    }
    const updatedQuestion = await prisma.question.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        date: new Date().toUTCString(),
        content: content,
        topic: topic,
        tags: tags,
      },
    });
    await pubsub.publish("QUESTION_UPDATED", {
      QuestionUpdated: updatedQuestion,
    });
    return updatedQuestion;
  },

  CreateQuestionComment: async (
    _parent,
    args: { questionCommentInput: QuestionCommentInput },
    _context,
  ) => {
    const { commenterId, rootQuestionId, content } = args.questionCommentInput;
    const newQuestionComment = await prisma.questionComment.create({
      data: {
        date: new Date().toUTCString(),
        commenterId: commenterId,
        rootQuestionId: rootQuestionId,
        content: content,
      },
    });
    await prisma.user.update({
      where: {
        id: commenterId,
      },
      data: {
        questionCommentsId: { push: newQuestionComment.id },
      },
    });
    await prisma.question.update({
      where: {
        id: rootQuestionId,
      },
      data: {
        commentsId: { push: newQuestionComment.id },
      },
    });
    await pubsub.publish("QUESTION_COMMENT_CREATED", {
      QuestionCommentCreated: newQuestionComment,
    });
    return newQuestionComment;
  },

  DeleteQuestionComment: async (_parent, args: { id: number }, _context) => {
    const id = args.id;
    const existingQuestionComment = await prisma.questionComment.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingQuestionComment) {
      throw new Error("question comment not found!");
    }
    const deletedQuestionComment = await prisma.questionComment.delete({
      where: {
        id: id,
      },
    });
    const updateUser = await prisma.user.findFirst({
      where: {
        id: deletedQuestionComment.commenterId,
      },
    });
    await prisma.user.update({
      where: {
        id: updateUser.id,
      },
      data: {
        questionCommentsId: updateUser.questionCommentsId.filter(
          (id) => id !== deletedQuestionComment.id,
        ),
      },
    });
    const updateQuestion = await prisma.question.findFirst({
      where: {
        id: deletedQuestionComment.rootQuestionId,
      },
    });
    await prisma.question.update({
      where: {
        id: updateQuestion.id,
      },
      data: {
        commentsId: updateQuestion.commentsId.filter(
          (id) => id !== deletedQuestionComment.id,
        ),
      },
    });
    await pubsub.publish("QUESTION_COMMENT_DELETED", {
      QuestionCommentDeleted: deletedQuestionComment,
    });
    return deletedQuestionComment;
  },

  UpdateQuestionComment: async (
    _parent,
    args: { id: number; questionCommentInput: QuestionCommentInput },
    _context,
  ) => {
    const id = args.id;
    const { commenterId, rootQuestionId, content } = args.questionCommentInput;
    const existingQuestionComment = await prisma.questionComment.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingQuestionComment) {
      throw new Error("question not found!");
    }
    if (existingQuestionComment.commenterId !== commenterId) {
      throw new Error("Commenter changed, this is not supposed to happen...");
    }
    if (existingQuestionComment.rootQuestionId !== rootQuestionId) {
      throw new Error(
        "Root question changed, this is not supposed to happen...",
      );
    }
    const updatedQuestionComment = await prisma.questionComment.update({
      where: {
        id: id,
      },
      data: {
        date: new Date().toUTCString(),
        content: content,
      },
    });
    await pubsub.publish("QUESTION_COMMENT_UPDATED", {
      QuestionCommentUpdated: updatedQuestionComment,
    });
    return updatedQuestionComment;
  },
  // Like Question
  LikeQuestion: async (
    _parent,
    args: { questionLikeInput: QuestionLikeInput },
    _context,
  ) => {
    const { likerId, questionId } = args.questionLikeInput;
    const findLiker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!findLiker) {
      throw new Error("Liker not found!");
    }

    const findQuestion = await prisma.question.findFirst({
      where: {
        id: questionId,
      },
    });
    if (!findQuestion) {
      throw new Error("Question not found!");
    }

    const newLike = await prisma.likedQuestion.create({
      data: {
        likerId: likerId,
        questionId: questionId,
      },
    });

    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedQuestionsId: { push: newLike.id },
      },
    });

    await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        likesId: { push: newLike.id },
      },
    });

    await pubsub.publish("QUESTION_LIKED", { QuestionLiked: newLike });
    return newLike;
  },
  // Unlike Question
  UnlikeQuestion: async (
    _parent,
    args: { questionUnlikeInput: QuestionLikeInput },
    _context,
  ) => {
    const { likerId, questionId } = args.questionUnlikeInput;

    const existingLike = await prisma.likedQuestion.findFirst({
      where: {
        likerId: likerId,
        questionId: questionId,
      },
    });
    if (!existingLike) {
      throw new Error("like not found!");
    }

    const liker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!liker) {
      throw new Error("Liker not found!");
    }

    const question = await prisma.question.findFirst({
      where: {
        id: questionId,
      },
    });
    if (!question) {
      throw new Error("Question not found!");
    }

    const deletedLike = await prisma.likedQuestion.delete({
      where: {
        id: existingLike.id,
      },
    });

    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedQuestionsId: liker.likedQuestionsId.filter(
          (id) => id !== deletedLike.id,
        ),
      },
    });

    await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        likesId: question.likesId.filter((id) => id !== deletedLike.id),
      },
    });

    await pubsub.publish("QUESTION_Unliked", { QuestionUnliked: deletedLike });
    return deletedLike;
  },
  // Like Question Comment
  LikeQuestionComment: async (
    _parent,
    args: { questionCommentLikeInput: QuestionCommentLikeInput },
    _context,
  ) => {
    const { likerId, questionCommentId } = args.questionCommentLikeInput;
    const findLiker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!findLiker) {
      throw new Error("Liker not found!");
    }

    const findQuestionComment = await prisma.questionComment.findFirst({
      where: {
        id: questionCommentId,
      },
    });
    if (!findQuestionComment) {
      throw new Error("Question Comment not found!");
    }

    const newLike = await prisma.likedQuestionComment.create({
      data: {
        likerId: likerId,
        questionCommentId: questionCommentId,
      },
    });

    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedQuestionCommentsId: { push: newLike.id },
      },
    });

    await prisma.questionComment.update({
      where: {
        id: questionCommentId,
      },
      data: {
        likesId: { push: newLike.id },
      },
    });

    await pubsub.publish("QUESTION_COMMENT_LIKED", {
      QuestionCommentLiked: newLike,
    });
    return newLike;
  },
  // Unlike Question Comment
  UnlikeQuestionComment: async (
    _parent,
    args: { questionCommentUnlikeInput: QuestionCommentLikeInput },
    _context,
  ) => {
    const { likerId, questionCommentId } = args.questionCommentUnlikeInput;

    const existingLike = await prisma.likedQuestionComment.findFirst({
      where: {
        likerId: likerId,
        questionCommentId: questionCommentId,
      },
    });
    if (!existingLike) {
      throw new Error("like not found!");
    }

    const liker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!liker) {
      throw new Error("Liker not found!");
    }

    const questionComment = await prisma.questionComment.findFirst({
      where: {
        id: questionCommentId,
      },
    });
    if (!questionComment) {
      throw new Error("Question Comment not found!");
    }

    const deletedLike = await prisma.likedQuestionComment.delete({
      where: {
        id: existingLike.id,
      },
    });

    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedQuestionCommentsId: liker.likedQuestionCommentsId.filter(
          (id) => id !== deletedLike.id,
        ),
      },
    });

    await prisma.questionComment.update({
      where: {
        id: questionCommentId,
      },
      data: {
        likesId: questionComment.likesId.filter((id) => id !== deletedLike.id),
      },
    });

    await pubsub.publish("QUESTION_COMMENT_Unliked", {
      QuestionCommentUnliked: deletedLike,
    });
    return deletedLike;
  },
  // Question End

  // Solution Start
  CreateSolution: async (
    _parent,
    args: { solutionInput: SolutionInput },
    _context,
  ) => {
    const { solverId, rootQuestionId, content } = args.solutionInput;
    const newSolution = await prisma.solution.create({
      data: {
        date: new Date().toUTCString(),
        solverId: solverId,
        content: content,
        rootQuestionId: rootQuestionId,
      },
    });
    await prisma.user.update({
      where: {
        id: solverId,
      },
      data: {
        solutionsId: { push: newSolution.id },
      },
    });
    await prisma.question.update({
      where: {
        id: rootQuestionId,
      },
      data: {
        solutionsId: { push: newSolution.id },
      },
    });
    await pubsub.publish("SOLUTION_CREATED", { SolutionCreated: newSolution });
    return newSolution;
  },

  DeleteSolution: async (_parent, args: { id: number }, _context) => {
    const id = args.id;
    const existingSolution = await prisma.solution.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingSolution) {
      throw new Error("solution not found!");
    }
    const deletedSolution = await prisma.solution.delete({
      where: {
        id: id,
      },
    });
    const updateUser = await prisma.user.findFirst({
      where: {
        id: deletedSolution.solverId,
      },
    });
    await prisma.user.update({
      where: {
        id: updateUser.id,
      },
      data: {
        solutionsId: updateUser.solutionsId.filter(
          (id) => id !== deletedSolution.id,
        ),
      },
    });
    const updateQuestion = await prisma.question.findFirst({
      where: {
        id: deletedSolution.rootQuestionId,
      },
    });
    await prisma.question.update({
      where: {
        id: updateQuestion.id,
      },
      data: {
        solutionsId: updateQuestion.solutionsId.filter(
          (id) => id !== deletedSolution.id,
        ),
      },
    });
    await pubsub.publish("SOLUTION_DELETED", {
      SolutionDeleted: deletedSolution,
    });
    return deletedSolution;
  },

  UpdateSolution: async (
    _parent,
    args: { id: number; solutionInput: SolutionInput },
    _context,
  ) => {
    const id = args.id;
    const { solverId, rootQuestionId, content } = args.solutionInput;
    const existingSolution = await prisma.solution.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingSolution) {
      throw new Error("solution not found!");
    }
    if (existingSolution.solverId !== solverId) {
      throw new Error("Solver changed, this is not supposed to happen...");
    }
    if (existingSolution.rootQuestionId !== rootQuestionId) {
      throw new Error(
        "Root question changed, this is not supposed to happen...",
      );
    }
    const updatedSolution = await prisma.solution.update({
      where: {
        id: id,
      },
      data: {
        date: new Date().toUTCString(),
        content: content,
      },
    });
    await pubsub.publish("SOLUTION_UPDATED", {
      SolutionUpdated: updatedSolution,
    });
    return updatedSolution;
  },

  CreateSolutionComment: async (
    _parent,
    args: { solutionCommentInput: SolutionCommentInput },
    _context,
  ) => {
    const { commenterId, rootSolutionId, content } = args.solutionCommentInput;
    const newSolutionComment = await prisma.solutionComment.create({
      data: {
        date: new Date().toUTCString(),
        commenterId: commenterId,
        rootSolutionId: rootSolutionId,
        content: content,
      },
    });
    await prisma.user.update({
      where: {
        id: commenterId,
      },
      data: {
        solutionCommentsId: { push: newSolutionComment.id },
      },
    });
    await prisma.solution.update({
      where: {
        id: rootSolutionId,
      },
      data: {
        commentsId: { push: newSolutionComment.id },
      },
    });
    await pubsub.publish("SOLUTION_COMMENT_CREATED", {
      SolutionCommentCreated: newSolutionComment,
    });
    return newSolutionComment;
  },

  DeleteSolutionComment: async (_parent, args: { id: number }, _context) => {
    const id = args.id;
    const existingSolutionComment = await prisma.solutionComment.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingSolutionComment) {
      throw new Error("solution comment not found!");
    }
    const deletedSolutionComment = await prisma.solutionComment.delete({
      where: {
        id: id,
      },
    });
    const updateUser = await prisma.user.findFirst({
      where: {
        id: deletedSolutionComment.commenterId,
      },
    });
    await prisma.user.update({
      where: {
        id: updateUser.id,
      },
      data: {
        solutionCommentsId: updateUser.solutionCommentsId.filter(
          (id) => id !== deletedSolutionComment.id,
        ),
      },
    });
    const updateSolution = await prisma.solution.findFirst({
      where: {
        id: deletedSolutionComment.rootSolutionId,
      },
    });
    await prisma.question.update({
      where: {
        id: updateSolution.id,
      },
      data: {
        commentsId: updateSolution.commentsId.filter(
          (id) => id !== deletedSolutionComment.id,
        ),
      },
    });
    await pubsub.publish("SOLUTION_COMMENT_DELETED", {
      QuestionCommentDeleted: deletedSolutionComment,
    });
    return deletedSolutionComment;
  },

  UpdateSolutionComment: async (
    _parent,
    args: { id: number; solutionCommentInput: SolutionCommentInput },
    _context,
  ) => {
    const id = args.id;
    const { commenterId, rootSolutionId, content } = args.solutionCommentInput;
    const existingSolutionComment = await prisma.solutionComment.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingSolutionComment) {
      throw new Error("question not found!");
    }
    if (existingSolutionComment.commenterId !== commenterId) {
      throw new Error("Commenter changed, this is not supposed to happen...");
    }
    if (existingSolutionComment.rootSolutionId !== rootSolutionId) {
      throw new Error(
        "Root solution changed, this is not supposed to happen...",
      );
    }
    const updatedSolutionComment = await prisma.solutionComment.update({
      where: {
        id: id,
      },
      data: {
        date: new Date().toUTCString(),
        content: content,
      },
    });
    await pubsub.publish("SOLUTION_COMMENT_UPDATED", {
      SolutionCommentUpdated: updatedSolutionComment,
    });
    return updatedSolutionComment;
  },
  // Like Solution
  LikeSolution: async (
    _parent,
    args: { solutionLikeInput: SolutionLikeInput },
    _context,
  ) => {
    const { likerId, solutionId } = args.solutionLikeInput;
    const findLiker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!findLiker) {
      throw new Error("Liker not found!");
    }

    const findSolution = await prisma.solution.findFirst({
      where: {
        id: solutionId,
      },
    });
    if (!findSolution) {
      throw new Error("Solution not found!");
    }

    const newLike = await prisma.likedSolution.create({
      data: {
        likerId: likerId,
        solutionId: solutionId,
      },
    });

    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedSolutionsId: { push: newLike.id },
      },
    });

    await prisma.solution.update({
      where: {
        id: solutionId,
      },
      data: {
        likesId: { push: newLike.id },
      },
    });

    await pubsub.publish("SOLUTION_LIKED", { SolutionLiked: newLike });
    return newLike;
  },
  // Unlike Solution
  UnlikeSolution: async (
    _parent,
    args: { solutionUnlikeInput: SolutionLikeInput },
    _context,
  ) => {
    const { likerId, solutionId } = args.solutionUnlikeInput;

    const existingLike = await prisma.likedSolution.findFirst({
      where: {
        likerId: likerId,
        solutionId: solutionId,
      },
    });
    if (!existingLike) {
      throw new Error("like not found!");
    }

    const liker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!liker) {
      throw new Error("Liker not found!");
    }

    const solution = await prisma.solution.findFirst({
      where: {
        id: solutionId,
      },
    });
    if (!solution) {
      throw new Error("Solution not found!");
    }

    const deletedLike = await prisma.likedSolution.delete({
      where: {
        id: existingLike.id,
      },
    });

    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedSolutionsId: liker.likedSolutionsId.filter(
          (id) => id !== deletedLike.id,
        ),
      },
    });

    await prisma.solution.update({
      where: {
        id: solutionId,
      },
      data: {
        likesId: solution.likesId.filter((id) => id !== deletedLike.id),
      },
    });

    await pubsub.publish("SOLUTION_Unliked", { SolutionUnliked: deletedLike });
    return deletedLike;
  },
  // Like Solution Comment
  LikeSolutionComment: async (
    _parent,
    args: { solutionCommentLikeInput: SolutionCommentLikeInput },
    _context,
  ) => {
    const { likerId, solutionCommentId } = args.solutionCommentLikeInput;
    const findLiker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!findLiker) {
      throw new Error("Liker not found!");
    }

    const findSolutionComment = await prisma.solutionComment.findFirst({
      where: {
        id: solutionCommentId,
      },
    });
    if (!findSolutionComment) {
      throw new Error("Solution Comment not found!");
    }

    const newLike = await prisma.likedSolutionComment.create({
      data: {
        likerId: likerId,
        solutionCommentId: solutionCommentId,
      },
    });

    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedSolutionCommentsId: { push: newLike.id },
      },
    });

    await prisma.solutionComment.update({
      where: {
        id: solutionCommentId,
      },
      data: {
        likesId: { push: newLike.id },
      },
    });

    await pubsub.publish("SOLUTION_COMMENT_LIKED", {
      SolutionCommentLiked: newLike,
    });
    return newLike;
  },
  // Unlike Solution Comment
  UnlikeSolutionComment: async (
    _parent,
    args: { solutionCommentUnlikeInput: SolutionCommentLikeInput },
    _context,
  ) => {
    const { likerId, solutionCommentId } = args.solutionCommentUnlikeInput;

    const existingLike = await prisma.likedSolutionComment.findFirst({
      where: {
        likerId: likerId,
        solutionCommentId: solutionCommentId,
      },
    });
    if (!existingLike) {
      throw new Error("like not found!");
    }

    const liker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!liker) {
      throw new Error("Liker not found!");
    }

    const solutionComment = await prisma.solutionComment.findFirst({
      where: {
        id: solutionCommentId,
      },
    });
    if (!solutionComment) {
      throw new Error("Solution Comment not found!");
    }

    const deletedLike = await prisma.likedSolutionComment.delete({
      where: {
        id: existingLike.id,
      },
    });

    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedSolutionCommentsId: liker.likedSolutionCommentsId.filter(
          (id) => id !== deletedLike.id,
        ),
      },
    });

    await prisma.solutionComment.update({
      where: {
        id: solutionCommentId,
      },
      data: {
        likesId: solutionComment.likesId.filter((id) => id !== deletedLike.id),
      },
    });

    await pubsub.publish("SOLUTION_COMMENT_Unliked", {
      SolutionCommentUnliked: deletedLike,
    });
    return deletedLike;
  },
  // Solution End

  // Article Start
  CreateArticle: async (
    _parent,
    args: { articleInput: ArticleInput },
    _context,
  ) => {
    const { writerId, title, content, tags, topic } = args.articleInput;
    const findWriter = await prisma.user.findFirst({
      where: {
        id: writerId,
      },
    });
    if (!findWriter) {
      throw new Error("Writer not found!");
    }

    const date = new Date().toUTCString();
    const newArticle = await prisma.article.create({
      data: {
        writerId: writerId,
        date: date,
        title: title,
        content: content,
        tags: tags,
        topic: topic,
      },
    });

    // update writer.articlesId
    await prisma.user.update({
      where: {
        id: writerId,
      },
      data: {
        articlesId: { push: newArticle.id },
      },
    });

    await pubsub.publish("ARTICLE_CREATED", { ArticleCreated: newArticle });
    return newArticle;
  },

  DeleteArticle: async (_parent, args: { id: number }, _context) => {
    const id = args.id;
    const existingArticle = await prisma.article.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingArticle) {
      throw new Error("article not found!");
    }

    // delete article in User.articlesId
    const userId = existingArticle.writerId;
    const writer = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    const articlesId = writer.articlesId;
    const index = articlesId.indexOf(id);
    articlesId.splice(index, 1);

    // update user.articlesId
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        articlesId: articlesId,
      },
    });

    const deletedArticle = await prisma.article.delete({
      where: {
        id: id,
      },
    });
    await pubsub.publish("ARTICLE_DELETED", { ArticleDeleted: deletedArticle });
    return deletedArticle;
  },

  UpdateArticle: async (
    _parent,
    args: { id: number; articleInput: ArticleInput },
    _context,
  ) => {
    const id = args.id;
    const { writerId, title, content, tags, topic } = args.articleInput;
    const existingArticle = await prisma.article.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingArticle) {
      throw new Error("article not found!");
    }

    const date = new Date().toUTCString();
    const updatedArticle = await prisma.article.update({
      where: {
        id: id,
      },
      data: {
        writerId: writerId,
        date: date,
        title: title,
        content: content,
        tags: tags,
        topic: topic,
      },
    });
    await pubsub.publish("ARTICLE_UPDATED", { ArticleUpdated: updatedArticle });
    return updatedArticle;
  },
  // Article End

  // ArticleComment Start
  CreateArticleComment: async (
    _parent,
    args: { articleCommentInput: ArticleCommentInput },
    _context,
  ) => {
    const { commenterId, content, rootArticleId } = args.articleCommentInput;
    const findCommenter = await prisma.user.findFirst({
      where: {
        id: commenterId,
      },
    });
    if (!findCommenter) {
      throw new Error("Commenter not found!");
    }

    const date = new Date().toUTCString();
    const newArticleComment = await prisma.articleComment.create({
      data: {
        commenterId: commenterId,
        date: date,
        content: content,
        rootArticleId: rootArticleId,
      },
    });

    // update commenter.articleCommentsId
    await prisma.user.update({
      where: {
        id: commenterId,
      },
      data: {
        articleCommentsId: { push: newArticleComment.id },
      },
    });

    // update article.commentsId
    await prisma.article.update({
      where: {
        id: rootArticleId,
      },
      data: {
        commentsId: { push: newArticleComment.id },
      },
    });

    await pubsub.publish("ARTICLECOMMENT_CREATED", {
      ArticleCommentCreated: newArticleComment,
    });
    return newArticleComment;
  },

  DeleteArticleComment: async (_parent, args: { id: number }, _context) => {
    const id = args.id;
    const existingArticleComment = await prisma.articleComment.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingArticleComment) {
      throw new Error("articleComment not found!");
    }

    // delete article in User.articlesId
    const userId = existingArticleComment.commenterId;
    const writer = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    const articleCommentsId = writer.articlesId;
    articleCommentsId.splice(articleCommentsId.indexOf(id), 1);

    // update user.articleCommentsId
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        articleCommentsId: articleCommentsId,
      },
    });

    // delete commentId in Article.commentsId
    const articleId = existingArticleComment.rootArticleId;
    const article = await prisma.article.findFirst({
      where: {
        id: articleId,
      },
    });
    const commentsId = article.commentsId;
    commentsId.splice(commentsId.indexOf(id), 1); // what?

    // update article.commentsId
    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        commentsId: commentsId,
      },
    });

    const deletedArticleComment = await prisma.articleComment.delete({
      where: {
        id: id,
      },
    });
    await pubsub.publish("ARTICLECOMMENT_DELETED", {
      ArticleCommentDeleted: deletedArticleComment,
    });
    return deletedArticleComment;
  },

  UpdateArticleComment: async (
    _parent,
    args: { id: number; articleCommentInput: ArticleCommentInput },
    _context,
  ) => {
    const id = args.id;
    const { commenterId, content, rootArticleId } = args.articleCommentInput;
    const existingArticleComment = await prisma.articleComment.findFirst({
      where: {
        id: id,
      },
    });
    if (!existingArticleComment) {
      throw new Error("articleComment not found!");
    }

    const date = new Date().toUTCString();
    const updatedArticleComment = await prisma.articleComment.update({
      where: {
        id: id,
      },
      data: {
        commenterId: commenterId,
        date: date,
        content: content,
        rootArticleId: rootArticleId,
      },
    });
    await pubsub.publish("ARTICLECOMMENT_UPDATED", {
      ArticleCommentUpdated: updatedArticleComment,
    });
    return updatedArticleComment;
  },
  // ArticleComment End

  // Liked Articles Start
  LikeArticle: async (
    _parent,
    args: { articleLikeInput: ArticleLikeInput },
    _context,
  ) => {
    const { likerId, articleId } = args.articleLikeInput;
    const findLiker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!findLiker) {
      throw new Error("Liker not found!");
    }

    const findArticle = await prisma.article.findFirst({
      where: {
        id: articleId,
      },
    });
    if (!findArticle) {
      throw new Error("Article not found!");
    }

    const newLike = await prisma.likedArticle.create({
      data: {
        likerId: likerId,
        articleId: articleId,
      },
    });

    // update liker.likeId
    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedArticlesId: { push: newLike.id },
      },
    });

    // update article.likeId
    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        likesId: { push: newLike.id },
      },
    });

    await pubsub.publish("ARTICLE_LIKED", { ArticleLiked: newLike });
    return newLike;
  },
  // Liked Articles End

  // Unliked Articles Start
  UnlikeArticle: async (
    _parent,
    args: { articleUnlikeInput: ArticleLikeInput },
    _context,
  ) => {
    const { likerId, articleId } = args.articleUnlikeInput;

    const existingLike = await prisma.likedArticle.findFirst({
      where: {
        likerId: likerId,
      },
    });
    if (!existingLike) {
      throw new Error("like not found!");
    }

    // update liker
    const liker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!liker) {
      throw new Error("Liker not found!");
    }
    const likedArticlesId = liker.likedArticlesId;
    likedArticlesId.splice(liker.likedArticlesId.indexOf(existingLike.id), 1);
    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedArticlesId: likedArticlesId,
      },
    });

    // update article
    const article = await prisma.article.findFirst({
      where: {
        id: articleId,
      },
    });
    if (!article) {
      throw new Error("Article not found!");
    }
    const likesId = article.likesId;
    likesId.splice(article.likesId.indexOf(existingLike.id), 1);
    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        likesId: likesId,
      },
    });

    // delete like
    const deletedLike = await prisma.likedArticle.delete({
      where: {
        id: existingLike.id,
      },
    });
    await pubsub.publish("ARTICLE_Unliked", { ArticleUnliked: deletedLike });
    return deletedLike;
  },

  // Unliked Articles End

  // Liked Articles Start
  LikeArticleComment: async (
    _parent,
    args: { articleCommentLikeInput: ArticleCommentLikeInput },
    _context,
  ) => {
    const { likerId, articleCommentId } = args.articleCommentLikeInput;
    const findLiker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!findLiker) {
      throw new Error("Liker not found!");
    }

    const findArticleComment = await prisma.articleComment.findFirst({
      where: {
        id: articleCommentId,
      },
    });
    if (!findArticleComment) {
      throw new Error("ArticleComment not found!");
    }

    const newLike = await prisma.likedArticleComment.create({
      data: {
        likerId: likerId,
        articleCommentId: articleCommentId,
      },
    });

    // update liker.likeId
    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedArticleCommentsId: { push: newLike.id },
      },
    });

    // update articleComment.likeId
    await prisma.articleComment.update({
      where: {
        id: articleCommentId,
      },
      data: {
        likesId: { push: newLike.id },
      },
    });

    await pubsub.publish("ARTICLECOMMENT_LIKED", {
      ArticleCommentLiked: newLike,
    });
    return newLike;
  },
  // Liked Articles End

  // Unliked Articles Start
  UnlikeArticleComment: async (
    _parent,
    args: { articleCommentUnlikeInput: ArticleCommentLikeInput },
    _context,
  ) => {
    const { likerId, articleCommentId } = args.articleCommentUnlikeInput;

    const existingLike = await prisma.likedArticleComment.findFirst({
      where: {
        likerId: likerId,
        articleCommentId: articleCommentId,
      },
    });
    if (!existingLike) {
      throw new Error("Like not found!");
    }

    // delete like in User.likedArticleCommentsId
    const liker = await prisma.user.findFirst({
      where: {
        id: likerId,
      },
    });
    if (!liker) {
      throw new Error("Liker not found!");
    }
    const likedArticleCommentIds = liker.likedArticleCommentsId;
    // find the specific like and delete it
    likedArticleCommentIds.splice(
      likedArticleCommentIds.indexOf(existingLike.id),
      1,
    );

    // update user.likedArticleCommentsId
    await prisma.user.update({
      where: {
        id: likerId,
      },
      data: {
        likedArticleCommentsId: likedArticleCommentIds,
      },
    });

    // delete likerId in ArticleComment.likesId
    const articleComment = await prisma.articleComment.findFirst({
      where: {
        id: articleCommentId,
      },
    });
    if (!articleComment) {
      throw new Error("Article not found!");
    }
    const likesId = articleComment.likesId;
    // find the specific like and delete it
    likesId.splice(likesId.indexOf(existingLike.id), 1);

    // update articleComment.likesId
    await prisma.articleComment.update({
      where: {
        id: articleCommentId,
      },
      data: {
        likesId: likesId,
      },
    });

    // Unlike
    const deletedLike = await prisma.likedArticleComment.delete({
      where: {
        id: existingLike.id,
      },
    });

    await pubsub.publish("ARTICLECOMMENT_Unliked", {
      ArticleCommentUnliked: deletedLike,
    });
    return deletedLike;
  },
  // Unliked Articles End
};

export { Mutation };
