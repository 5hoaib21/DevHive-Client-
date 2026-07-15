import { getResourcesWithReviews } from '@/lib/api/review';
import { Star, User, MessageCircle, Quote } from 'lucide-react';

const ReviewSection = async () => {
  const promptsWithReviews = await getResourcesWithReviews();

  const allReviews: any[] = [];
  promptsWithReviews.forEach((prompt: any) => {
    if (prompt.reviews && prompt.reviews.length > 0) {
      prompt.reviews.forEach((review: any) => {
        allReviews.push({
          ...review,
          promptTitle: prompt.title,
          resourceCategory: prompt.category
        });
      });
    }
  });

  if (!promptsWithReviews || promptsWithReviews.length === 0) {
    return (
      <section className="py-16 bg-dh-surface">
        <div className="dh-container">
          <div className="dh-empty border-2 border-dashed border-dh-border rounded-xl">
            <MessageCircle className="w-12 h-12 text-gray-300" />
            <p className="dh-empty-text font-semibold text-gray-700">No reviews yet</p>
            <p className="dh-empty-text">Be the first to share your experience!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-dh-surface">
      <div className="dh-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="dh-section-heading">Community Reviews</h2>
          <p className="dh-section-subtitle mt-1">
            See what our community says about these resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {allReviews.slice(0, 4).map((review, index) => (
            <div key={index} className="dh-card p-5">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= review.rating ? 'text-dh-star fill-dh-star' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                {review.comment}
              </p>

              <div className="flex items-center justify-between border-t border-dh-border pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-dh-teal flex items-center justify-center text-white text-[10px] font-bold">
                    {review.userName?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {review.userName || 'Anonymous'}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {review.resourceCategory || 'Resource'}
                    </p>
                  </div>
                </div>
                <Quote size={14} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
