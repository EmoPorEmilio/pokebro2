import { BodyContainer } from '../../scenes.styles.js';
import { Option } from 'components/Options/Options.styles.js';
import { DIFFICULTY_LEVELS } from 'constants.js';
export const DifficultySelector = ({ goToGame }) => (
  <>
    <BodyContainer>
      <Option onClick={() => goToGame(DIFFICULTY_LEVELS.EASY)}>
        <span>{DIFFICULTY_LEVELS.EASY}</span>
      </Option>
      <Option onClick={() => goToGame(DIFFICULTY_LEVELS.HARD)}>
        <span>{DIFFICULTY_LEVELS.HARD}</span>
      </Option>
    </BodyContainer>
  </>
);
