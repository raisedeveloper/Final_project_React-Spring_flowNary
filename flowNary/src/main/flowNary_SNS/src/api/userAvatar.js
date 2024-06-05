import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './axiosGet';

const UserAvatar = ({ profileUrl, size, uid }) => {
  const sizes = {
    x_small: `1.75rem`,
    small: '2.5rem',
    medium: '5rem',
    medium2: '7rem',
    large: '12rem'
  };
  const user = useQuery({
    queryKey: ['userAvatar', uid],
    queryFn: () => {
      if (!profileUrl && uid) { // UID가 존재하는 경우에만 데이터를 가져옴
        console.log(uid);
        return getUser(uid);
      } else {
        return null; // UID가 없는 경우 null 반환
      }
    },
  });
  const avatarSize = sizes[size] || sizes.small;

  return (
    <>
      {!uid ?
        <div
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: '50%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profileUrl})`
          }}
        >
        </div>
        :
        <>
          {!profileUrl && user && user.data &&
            <div
              style={{
                width: avatarSize,
                height: avatarSize,
                borderRadius: '50%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${user.data.profile})`
              }}
            >
            </div>}
        </>}
    </>
  );
};

UserAvatar.propTypes = {
  profileUrl: PropTypes.string,
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'medium2', 'large']),
  uid: PropTypes.number
};

UserAvatar.defaultProps = {
  size: 'small'
};

export default UserAvatar;
