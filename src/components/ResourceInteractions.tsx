"use client";

import React, { useState } from "react";
import {
  Share2,
  Bookmark,
  Star,
  Send,
  MessageCircle,
  CopyCheck,
  BookmarkCheck,
  Lock,
  Copy,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { MdReport } from "react-icons/md";
import {
  incrementUsageCount as incrementCopyCount,
  submitResourceReview as submitPromptReview,
  toggleResourceBookmark as togglePromptBookmark,
  submitResourceReport as submitPromptReport,
} from "@/lib/actions/prompts";
import { useRouter } from "next/navigation";

import {
  Button,
  Input,
  Label,
  Modal,
  TextField,
} from "@heroui/react";

export default function ResourceInteractions({
  promptId,
  promptContent,
  rating: initialRating,
  totalReviews,
  reviews,
  bookmarks = [],
  currentUserId,
  isLocked = false,
  user,
}: {
  promptId: string;
  promptContent: string;
  rating: any;
  totalReviews: any;
  reviews: any[];
  bookmarks?: any[];
  currentUserId: any;
  isLocked?: boolean;
  user: any;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSaved, setIsSaved] = useState(bookmarks.includes(currentUserId));
  const [isLoading, setIsLoading] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  const router = useRouter();

  const renderStarsStatic = (num: number) => {
    const fullStars = Math.floor(num);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < fullStars ? "text-dh-star fill-dh-star" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const handleCopy = async () => {
    if (isLocked) {
      toast.error("Sign in to interact with this resource.");
      return;
    }
    try {
      await navigator.clipboard.writeText(promptContent);
      toast.success("Resource copied to clipboard!");

      const response = await incrementCopyCount(promptId);
      if (response.success) {
        router.refresh();
      }
    } catch (err) {
      toast.error("Failed to copy resource.");
    }
  };

  const handleSaveToggle = async () => {
    if (isLocked) {
      toast.error("Sign in to save resources to your bookmarks.");
      return;
    }
    try {
      const response = await togglePromptBookmark(promptId);
      if (response.success) {
        setIsSaved(response.isSaved);
        if (response.isSaved) {
          toast.success("Added to your saved collections!");
        } else {
          toast.success("Removed from saved collections.");
        }
        router.refresh();
      } else {
        toast.error(response.error || "Failed to update bookmark. Make sure you are logged in.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating star first.");
      return;
    }

    setIsLoading(true);
    try {
      const reviewPayload = { rating, comment };
      const response = await submitPromptReview(promptId, reviewPayload);

      if (response.success) {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(0);
        router.refresh();
      } else {
        toast.error(response.error || "Failed to submit review. Make sure you are logged in.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason) {
      toast.error("Please select a reason for reporting.");
      return;
    }

    setIsReporting(true);
    try {
      const response = await submitPromptReport(promptId, {
        reason: reportReason,
        description: reportDescription,
      });

      if (response.success) {
        toast.success(response.message || "Report submitted successfully.");
        setReportReason("");
        setReportDescription("");
        setIsModalOpen(false);
      } else {
        toast.error(response.error || "Failed to submit report.");
      }
    } catch (error) {
      toast.error("Something went wrong. Failed to submit report.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className={'flex-1 min-w-[120px] dh-btn ' + (isLocked ? 'dh-btn-ghost text-gray-400 cursor-not-allowed' : 'dh-btn-primary')}
        >
          {isLocked ? <Lock size={16} /> : <CopyCheck size={16} />}
          Copy Resource
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 min-w-[120px] dh-btn dh-btn-secondary"
        >
          <MdReport size={16} className="text-dh-danger" />
          Report
        </button>

        <button
          onClick={handleSaveToggle}
          className={'flex-1 min-w-[120px] dh-btn ' + (isLocked ? 'dh-btn-ghost text-gray-400 cursor-not-allowed' : isSaved ? 'dh-btn-primary' : 'dh-btn-secondary')}
        >
          {isLocked ? <Lock size={16} /> : isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          {isSaved && !isLocked ? "Saved" : "Save"}
        </button>
      </div>

      {/* Report Modal */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="center">
            <Modal.Dialog className="sm:max-w-md bg-white p-6 rounded-xl border border-dh-border shadow-lg">
              <Modal.CloseTrigger onClick={() => setIsModalOpen(false)} />

              <Modal.Header>
                <Modal.Heading className="flex items-center gap-2 text-dh-danger font-bold text-xl">
                  <MdReport size={24} /> Report Resource
                </Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-gray-500">
                  Help us understand what's wrong with this resource.
                </p>
              </Modal.Header>

              <Modal.Body className="py-4">
                <form onSubmit={handleReportSubmit} className="flex flex-col gap-4">
                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Select Report Reason
                    </label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="dh-input appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Choose a reason</option>
                      <option value="Inappropriate Content">Inappropriate Content</option>
                      <option value="Spam">Spam</option>
                      <option value="Copyright Violation">Copyright Violation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <TextField className="w-full" name="description" variant="secondary">
                    <Label className="text-sm font-medium text-gray-700">
                      Description (Optional)
                    </Label>
                    <Input
                      placeholder="Provide additional details or proof..."
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      className="dh-input"
                    />
                  </TextField>

                  <Modal.Footer className="flex justify-end gap-2 pt-4 border-t border-dh-border">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}
                      className="dh-btn dh-btn-ghost"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isDisabled={isReporting}
                      className="dh-btn dh-btn-danger"
                    >
                      {isReporting ? "Submitting..." : "Submit Report"}
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* Reviews Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle size={18} className="text-dh-teal" />
            Community Reviews
          </h3>
          <div className="flex items-center gap-2">
            {renderStarsStatic(initialRating)}
            <span className="text-xs text-gray-400">({totalReviews})</span>
          </div>
        </div>

        <div className="border border-dh-border rounded-xl overflow-hidden mb-5">
          <div className="bg-dh-surface p-5">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Star size={16} className="text-dh-star fill-dh-star" />
              Write a Review
            </h4>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Your Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={isLoading}
                      onClick={() => setRating(star)}
                      className="hover:scale-110 active:scale-95 transition-transform duration-150 focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={'transition-colors duration-200 ' + (star <= rating ? 'text-dh-star fill-dh-star' : 'text-gray-300')}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700 ml-2">
                  {rating > 0 ? rating + '.0' : '0.0'}
                </span>
              </div>

              <textarea
                value={comment}
                disabled={isLoading}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here. What worked? How did you test it?"
                className="dh-input resize-none"
                rows={3}
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className="dh-btn dh-btn-primary w-full"
              >
                <Send size={16} />
                {isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>

        {reviews && reviews.length > 0 ? (
          <div className="space-y-3">
            {reviews.map((review: any, index: number) => (
              <div key={index} className="bg-dh-surface rounded-xl p-4 border border-dh-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-dh-teal flex items-center justify-center text-white text-xs font-bold">
                      {review.userName?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {review.userName || 'Anonymous'}
                    </span>
                  </div>
                  {renderStarsStatic(review.rating)}
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-dh-surface rounded-xl border-2 border-dashed border-dh-border">
            <MessageCircle size={40} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">
              No reviews yet. Be the first to review!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
