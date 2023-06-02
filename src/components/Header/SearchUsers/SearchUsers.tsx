import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LINKS } from '@src/links';

import { useLazyGetUsersListQuery } from '@api/UsersApi/UsersApi';
import { UsersDTO } from '@api/UsersApi';

import { useDebounce } from '@hooks/useDebounce';

import { Input } from '@components/Input';

import { ReactComponent as SearchIcon } from '@assets/icons/search_icon.svg';
import HeaderTemplate from '@assets/header_template.png';

import * as ST from './styled';

const SearchUsers: FC = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<UsersDTO[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const autoCompleteRef = useRef<HTMLDivElement>(null);
  const [getUsersQuery] = useLazyGetUsersListQuery();
  const debouncedSearch = useDebounce(search, 300);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      if (debouncedSearch) {
        const res = await getUsersQuery({ query: debouncedSearch });
        if ('data' in res) {
          setUsers(res.data || []);
        }
      }
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getUsers();
  }, [debouncedSearch]);

  const onClickAutoCompleteHandler = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, id: string) => {
      setIsOpen(!isOpen);
      setSearch('');
      navigate(`${LINKS.profile}?id=${id}`);
    },
    [isOpen],
  );

  const onClickHandler = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!autoCompleteRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen, autoCompleteRef]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <ST.SearchWrapper ref={autoCompleteRef}>
      <Input
        decoration="filled"
        inputSize="md"
        style={{ fontSize: '24px' }}
        icon={<SearchIcon width={30} />}
        value={search}
        onChange={onChangeHandler}
        onClick={onClickHandler}
      />
      {search && isOpen && users.length !== 0 && (
        <ST.AutoCompleteWrapper>
          {users.map((user) => (
            <ST.AutoComplete
              key={user.id}
              onClick={(e) => onClickAutoCompleteHandler(e, user.id)}
            >
              {user.avatar ? (
                <ST.SearchAvatar src={user.avatar} />
              ) : (
                <ST.SearchAvatar src={HeaderTemplate} />
              )}
              <div>
                {user.firstName} {user.lastName}
              </div>
            </ST.AutoComplete>
          ))}
        </ST.AutoCompleteWrapper>
      )}
    </ST.SearchWrapper>
  );
};

export { SearchUsers };
