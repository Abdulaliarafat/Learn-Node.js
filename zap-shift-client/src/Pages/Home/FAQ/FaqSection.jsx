import React from 'react';

const faqData = [
  {
    id: 1,
    question: 'How does this posture corrector work?',
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
  },
  {
    id: 2,
    question: 'Is it suitable for all ages and body types?',
    answer: ''
  },
  {
    id: 3,
    question: 'Does it really help with back pain and posture improvement?',
    answer: ''
  },
  {
    id: 4,
    question: 'Does it have smart features like vibration alerts?',
    answer: ''
  },
  {
    id: 5,
    question: 'How will I be notified when the product is back in stock?',
    answer: ''
  }
];

const FaqSection = () => {
  return (
    <div className="bg-base-200 py-16 px-4 text-center my-5">
      {/* Header */}
      <h2 className="text-3xl font-bold text-base-content mb-4">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="max-w-2xl mx-auto text-base-content/70 mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper
        alignment, reduce pain, and strengthen your body with ease!
      </p>

      {/* FAQ List */}
      <div className="max-w-2xl mx-auto text-left space-y-2 ">
        {faqData.map((item, index) => (
          <div
            key={item.id}
            className={`collapse collapse-arrow bg-white dark:bg-gray-600 dark:text-white ${
              index === 0 ? 'border border-info bg-info/10' : 'border border-base-300'
            }`}
          >
            <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
            <div
              className={`collapse-title font-medium ${
                index === 0 ? 'text-info' : 'text-base-content'
              }`}
            >
              {item.question}
            </div>
            <div className="collapse-content text-sm text-base-content/70">
              <p>
                {item.answer ||
                  'Answer coming soon. Contact support for more information.'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="mt-10">
        <button className="btn btn-primary btn-lg">
          See More FAQ’s
          <span className="ml-2 text-xl">↗</span>
        </button>
      </div>
    </div>
  );
};

export default FaqSection;
