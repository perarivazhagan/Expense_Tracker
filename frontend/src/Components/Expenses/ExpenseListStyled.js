import styled from 'styled-components';

const ExpenseListStyled = styled.div`
    padding: 2rem;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

    h2 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .filter-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        label {
            font-size: 1rem;
            color: rgba(34, 34, 96, 0.7);
        }

        input[type="date"] {
            padding: 0.5rem;
            border: 2px solid #eee;
            border-radius: 5px;
            font-size: 1rem;
            color: rgba(34, 34, 96, 0.8);
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        }

        button {
            padding: 0.5rem 1rem;
            background-color: #FCF6F9;
            color: #000;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            transition: background 0.3s ease;

            &:hover {
                background-color: var(--color-accent);
            }
        }
    }

    .download-button {
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;

        button {
            padding: 0.8rem 1.6rem;
            background-color: #FCF6F9;
            color: #000;
            border: none;
            border-radius: 30px;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            transition: background 0.3s ease;

            &:hover {
                background-color: var(--color-accent);
            }
        }
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 15px;
            padding: 1rem;
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            strong {
                font-size: 1.1rem;
                color: rgba(34, 34, 96, 0.9);
            }

            span {
                font-size: 1rem;
                color: rgba(34, 34, 96, 0.7);
            }
        }
    }
`;

export default ExpenseListStyled;
