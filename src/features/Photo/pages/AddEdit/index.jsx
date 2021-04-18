import Banner from 'components/Banner';
import IMAGES from 'constants/Images';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { randomNumber } from 'utils/common';
import './style.scss';

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory(); // for redirect
  const { photoId } = useParams();
  const isAddMode = !photoId;

  const editedPhoto = useSelector((state) => {
    // const foundPhoto = state.photos.find((x) => x.id === photoId);
    // Vi id cua 1 item la 1 so, nhung khi dua vao thi photoId la` 1 string, vi the phai chuyen photoId sang so => maybe them dau + truoc photoId

    const foundPhoto = state.photos.find((x) => x.id === +photoId);
    console.log({ phots: state.photos, photoId, foundPhoto });
    return foundPhoto;
  });

  const initialValues = isAddMode
    ? {
        title: '',
        categoryId: null,
        photo: '',
      }
    : editedPhoto;

  const handleSubmit = (values) => {
    // fake reload api in 2 seconds
    return new Promise((resolve) => {
      console.log('Form submit: ', values);

      setTimeout(() => {
        if (isAddMode) {
          const newPhoto = {
            ...values,
            id: randomNumber(10000, 99999),
          };

          const action = addPhoto(newPhoto);
          console.log({ action });
          dispatch(action);
        } else {
          // Do something here
          const action = updatePhoto(values);
          dispatch(action);
        }

        history.push('/photos');
        resolve(true);
      }, 2000);
    });
  };
  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo ^^!" backgroundUrl={IMAGES.PEXEL_3} />

      <div className="photo-edit__form">
        <PhotoForm onSubmit={handleSubmit} initialValues={initialValues} isAddMode={isAddMode} />
      </div>
    </div>
  );
}

export default AddEditPage;
