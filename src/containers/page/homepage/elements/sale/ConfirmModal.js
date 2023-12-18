import React, { useState } from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import { Modal, Spin, Icon } from 'antd';
import { useActiveWeb3React } from 'hooks';
import strkImg from 'assets/img/homepage/strk.svg';
import closeImg from 'assets/img/homepage/close.png';
import { useTokenApproval } from 'hooks/useTokenApproval';
import { useSaleAction } from 'hooks/useSaleAction';
import { getReadableNumber } from 'utilities/common';
import { ASSET } from 'utilities/constants';

const ModalContent = styled.div`
  border-radius: 6px;
  box-shadow: 0px 0px 10px 0px #1760ed;
  color: white;
  padding: 20px 40px;

  .close-btn {
    position: absolute;
    top: 23px;
    right: 23px;
  }

  .header-content {
    margin-top: 45px;
    .title {
      font-size: 24px;
    }
  }

  .item {
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .label {
      color: #aaa;
      font-size: 18px;
    }

    .value {
      font-size: 20px;
      display: flex;
      gap: 10px;
      align-items: center;

      img {
        width: 24px;
        height: 24px;
      }

      .price {
        font-size: 16px;
      }
    }
  }

  .confirm_btn {
    font-size: 18px;
    width: 100%;
    padding: 6px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #107def;
    cursor: pointer;
  }

  .confirm_btn.disabled {
    color: #aaa;
    background: #34384c;
  }

  @media (max-width: 420px) {
    .connect-wallet-wrapper {
      margin-bottom: 20px;
    }
  }
`;

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, marginRight: '10px' }} spin />
);
// settings, setSetting
function ConfirmModal({
  pid,
  inAsset,
  inAmount,
  vestingPlan,
  planName,
  strkPrice,
  outAmount,
  ethPrice,
  visible,
  approveReload,
  setApproveReload,
  onCancel,
  onConfirm
}) {
  const { account, chainId } = useActiveWeb3React();
  const { depositPool } = useSaleAction(chainId, account);
  const { approveToken } = useTokenApproval(
    chainId,
    account,
    inAsset,
    approveReload
  );
  const [pending, setPending] = useState();

  const handleConfirm = async () => {
    try {
      if (pending) return;
      setPending(true);
      if (visible === 'approve') {
        await approveToken(
          new BigNumber(inAmount)
            .times(new BigNumber(10).pow(ASSET[chainId][inAsset].decimal))
            .toString(10)
        );
        setApproveReload();
      }

      await depositPool(inAsset, pid, inAmount, vestingPlan);
      setPending(false);
      onCancel();
      onConfirm();
    } catch (error) {
      setPending(false);
    }
  };
  return (
    <Modal
      className="connect-modal"
      width={480}
      visible={visible !== ''}
      onCancel={onCancel}
      footer={null}
      closable={false}
      maskClosable
      centered
      zIndex={10}
    >
      <ModalContent className="flex flex-column align-center just-center">
        <img
          className="close-btn pointer"
          src={closeImg}
          alt="close"
          onClick={onCancel}
        />
        <div className="header-content">
          <div className="title">Confirm your purchase</div>
        </div>

        <div className="item">
          <div className="label">Your pay</div>
          <div className="value">
            <img src={ASSET[chainId][inAsset].image} alt="in-asset" />{' '}
            <div>
              <div>
                {inAmount} {inAsset.toUpperCase()}
              </div>
              {inAsset === 'eth' && (
                <div className="price">
                  ${' '}
                  {getReadableNumber(
                    new BigNumber(ethPrice).times(inAmount),
                    18
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="item">
          <div className="label">Vesting Plan</div>
          <div className="value">{planName}</div>
        </div>

        <div className="item">
          <div className="label">Strk Price</div>
          <div className="value">{strkPrice}</div>
        </div>

        <div className="item">
          <div className="label">Receive</div>
          <div className="value">
            <img src={strkImg} alt="out-asset" />
            <div>{outAmount} STRK</div>
          </div>
        </div>

        <div
          className={`confirm_btn ${pending ? 'disabled' : ''}`}
          onClick={() => handleConfirm()}
        >
          {pending && <Spin className="spinner" indicator={antIcon} />}
          Confirm
        </div>
      </ModalContent>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  pid: PropTypes.number,
  inAsset: PropTypes.string,
  inAmount: PropTypes.string,
  vestingPlan: PropTypes.number,
  planName: PropTypes.string,
  strkPrice: PropTypes.string,
  outAmount: PropTypes.string,
  ethPrice: PropTypes.number,
  visible: PropTypes.string,
  approveReload: PropTypes.number,
  setApproveReload: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

ConfirmModal.defaultProps = {
  pid: 0,
  inAsset: '',
  inAmount: '',
  vestingPlan: 0,
  planName: '',
  strkPrice: '',
  outAmount: '',
  visible: '',
  ethPrice: 0,
  approveReload: 0,
  setApproveReload: () => {},
  onCancel: () => {},
  onConfirm: () => {}
};

export default ConfirmModal;
