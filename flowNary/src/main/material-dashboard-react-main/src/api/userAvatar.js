import React from 'react';
import PropTypes from 'prop-types';

const UserAvatar = ({ profileUrl, size }) => {
  const sizes = {
    x_small: `1.75rem`,
    small: '2.5rem',
    medium: '5rem',
    medium2: '7rem',
    large: '12rem'
  };

  const avatarSize = sizes[size] || sizes.small;

  return (
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
  );
};

UserAvatar.propTypes = {
  profileUrl: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'medium2', 'large'])
};

UserAvatar.defaultProps = {
  size: 'small'
};

export default UserAvatar;
