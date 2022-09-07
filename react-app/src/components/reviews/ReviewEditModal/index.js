import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import ReviewEdit from './ReviewEdit';


export default function EditReviewModal({reviewId, recipeId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ReviewEdit reviewId={reviewId} recipeId={recipeId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
