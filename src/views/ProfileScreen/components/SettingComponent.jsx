import ChangeProfileForm from './changeUserProfileForm/ChangeProfileForm';
import ChangePasswordForm from './changeUserProfileForm/ChangePasswordForm';

const SettingComponent = () => {
  return (
    <div className="space-y-8">
      <ChangeProfileForm />

      <ChangePasswordForm />
    </div>
  );
};

export default SettingComponent;
