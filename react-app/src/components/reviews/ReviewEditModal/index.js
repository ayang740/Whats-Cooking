import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import ReviewEdit from './ReviewEdit';
import {FaPencilAlt} from "react-icons/fa";
import '../reviews.css'

export default function EditReviewModal({reviewId, recipeId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='reviews-list-individual-button' onClick={() => setShowModal(true)}><FaPencilAlt /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ReviewEdit reviewId={reviewId} recipeId={recipeId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
