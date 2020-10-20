package com.uinetworks.myapp;

public class pagingVo {
	private int curPageCnt; // 현재 페이지
    private int startRowCnt;// ~부터
    private int endRowCnt;// ~까지
    private int totalPageCnt; //전체 페이지
    private int totalRowCnt;
    private int start_page;
    private int endPageCnt;
    
    private int PAGE_LIST_CNT = 15; // 리스트 화면당 표출 갯수

    
    
	public int getTotalRowCnt() {
		return totalRowCnt;
	}

	public void setTotalRowCnt(int totalRowCnt) {
		this.totalRowCnt = totalRowCnt;
	}

	public int getEndRowCnt() {
		return endRowCnt;
	}

	public void setEndRowCnt(int endRowCnt) {
		this.endRowCnt = endRowCnt;
	}

	public int getCurPageCnt() {
		return curPageCnt;
	}

	public void setCurPageCnt(int curPageCnt) {
		this.curPageCnt = curPageCnt;
	}

	public int getStartRowCnt() {
		return startRowCnt;
	}

	public void setStartRowCnt(int startRowCnt) {
		this.startRowCnt = startRowCnt;
	}

	public int getTotalPageCnt() {
		return totalPageCnt;
	}

	public void setTotalPageCnt(int totalPageCnt) {
		this.totalPageCnt = totalPageCnt;
	}

	public int getStart_page() {
		return start_page;
	}

	public void setStart_page(int start_page) {
		this.start_page = start_page;
	}

	public int getEndPageCnt() {
		return endPageCnt;
	}

	public void setEndPageCnt(int endPageCnt) {
		this.endPageCnt = endPageCnt;
	}

	public int getPAGE_LIST_CNT() {
		return PAGE_LIST_CNT;
	}

	public void setPAGE_LIST_CNT(int pAGE_LIST_CNT) {
		PAGE_LIST_CNT = pAGE_LIST_CNT;
	}
    
    
}
