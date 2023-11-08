import { Option } from 'components/Options/Options.styles.js';
import { BodyContainer } from './../scenes.styles.js';
import { Header } from 'components/Header';
import { Content } from 'app/App.styles.js';
import { GAME_MODES } from 'constants.js';

export const Landing = ({
  goToPokemonGuesser,
  goToDamageCalculator,
  handleHeaderBack,
}) => (
  <>
    <Header handleHeaderBack={handleHeaderBack} inGame={false}></Header>
    <Content>
      <BodyContainer>
        <Option onClick={goToPokemonGuesser}>
          <span>{GAME_MODES.POKEMON_GUESSER}</span>
        </Option>
        <Option onClick={goToDamageCalculator}>
          <span>{GAME_MODES.DAMAGE_CALCULATOR}</span>
        </Option>
      </BodyContainer>
    </Content>
  </>
);
